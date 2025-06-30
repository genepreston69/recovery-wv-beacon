
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StoryList } from './StoryList';
import { StoryForm } from './StoryForm';
import { useAzureAuth } from '@/hooks/useAzureAuth';
import { PhotoGallery } from './PhotoGallery';
import { ChatAdmin } from './ChatAdmin';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

export const AdminPanel = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author_name: '',
    author_title: '',
    featured_image_url: '',
    is_published: false
  });
  const { isAuthenticated, user } = useAzureAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchStories();
    }
  }, [isAuthenticated]);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
      toast.error('Failed to fetch stories');
    }
  };

  const handleEditStory = (story: Story) => {
    setEditingStory(story);
    setFormData({
      title: story.title,
      content: story.content,
      author_name: story.author_name,
      author_title: story.author_title || '',
      featured_image_url: story.featured_image_url || '',
      is_published: story.is_published
    });
  };

  const handleDeleteStory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('success_stories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setStories(stories.filter(story => story.id !== id));
      toast.success('Story deleted successfully');
    } catch (error) {
      console.error('Error deleting story:', error);
      toast.error('Failed to delete story');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingStory) {
        // Update existing story
        const { error } = await supabase
          .from('success_stories')
          .update(formData)
          .eq('id', editingStory.id);
        
        if (error) throw error;
        toast.success('Story updated successfully');
      } else {
        // Create new story - include created_by field
        const { error } = await supabase
          .from('success_stories')
          .insert({
            ...formData,
            created_by: user?.homeAccountId || 'unknown-user'
          });
        
        if (error) throw error;
        toast.success('Story created successfully');
      }
      
      fetchStories();
      handleCancel();
    } catch (error) {
      console.error('Error saving story:', error);
      toast.error('Failed to save story');
    }
  };

  const handleCancel = () => {
    setEditingStory(null);
    setFormData({
      title: '',
      content: '',
      author_name: '',
      author_title: '',
      featured_image_url: '',
      is_published: false
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please sign in to access the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Content Management System</h1>
        
        <Tabs defaultValue="stories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="create">Create Story</TabsTrigger>
            <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
            <TabsTrigger value="chat">Chat Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stories">
            <StoryList 
              stories={stories}
              onEdit={handleEditStory}
              onDelete={handleDeleteStory}
            />
          </TabsContent>
          
          <TabsContent value="create">
            <StoryForm 
              editingStory={editingStory}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </TabsContent>
          
          <TabsContent value="gallery">
            <PhotoGallery />
          </TabsContent>
          
          <TabsContent value="chat">
            <ChatAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
