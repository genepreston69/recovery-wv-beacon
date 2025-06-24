
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Upload, Image } from 'lucide-react';
import { ContentUpload } from './ContentUpload';
import { StoryForm } from './StoryForm';
import { StoryList } from './StoryList';
import { PhotoGallery } from './PhotoGallery';
import { Card, CardContent } from '@/components/ui/card';

interface Story {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_title?: string;
  featured_image_url?: string;
  is_published: boolean;
  created_at: string;
}

const initialFormData = {
  title: '',
  content: '',
  author_name: '',
  author_title: '',
  featured_image_url: '',
  is_published: true,
};

export const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [stories, setStories] = useState<Story[]>([]);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showContentUpload, setShowContentUpload] = useState(false);
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isAdmin) {
      fetchStories();
    }
  }, [isAdmin]);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setStories(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching stories",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (editingStory) {
        const { error } = await supabase
          .from('success_stories')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingStory.id);
        
        if (error) throw error;
        toast({ title: "Story updated successfully" });
      } else {
        const { error } = await supabase
          .from('success_stories')
          .insert([{ ...formData, created_by: user.id }]);
        
        if (error) throw error;
        toast({ title: "Story created successfully" });
      }

      resetForm();
      fetchStories();
    } catch (error: any) {
      toast({
        title: "Error saving story",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (story: Story) => {
    setFormData({
      title: story.title,
      content: story.content,
      author_name: story.author_name,
      author_title: story.author_title || '',
      featured_image_url: story.featured_image_url || '',
      is_published: story.is_published,
    });
    setEditingStory(story);
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return;

    try {
      const { error } = await supabase
        .from('success_stories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Story deleted successfully" });
      fetchStories();
    } catch (error: any) {
      toast({
        title: "Error deleting story",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingStory(null);
    setIsCreating(false);
  };

  const handleContentUploaded = () => {
    toast({ title: "Content uploaded successfully" });
  };

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">Access denied. Admin privileges required.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content Management Admin</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowContentUpload(!showContentUpload)}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Content
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowPhotoGallery(!showPhotoGallery)}
          >
            <Image className="w-4 h-4 mr-2" />
            Photo Gallery
          </Button>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Story
          </Button>
        </div>
      </div>

      {showContentUpload && (
        <ContentUpload onContentUploaded={handleContentUploaded} />
      )}

      {showPhotoGallery && (
        <PhotoGallery />
      )}

      {isCreating && (
        <StoryForm
          editingStory={editingStory}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      )}

      <StoryList 
        stories={stories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
