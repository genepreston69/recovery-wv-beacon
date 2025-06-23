
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { PhotoUpload } from './PhotoUpload';
import { ContentUpload } from './ContentUpload';

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
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [stories, setStories] = useState<Story[]>([]);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showContentUpload, setShowContentUpload] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author_name: '',
    author_title: '',
    featured_image_url: '',
    is_published: true,
  });

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

      setFormData({
        title: '',
        content: '',
        author_name: '',
        author_title: '',
        featured_image_url: '',
        is_published: true,
      });
      setEditingStory(null);
      setIsCreating(false);
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

  const handlePhotoUpload = (url: string) => {
    setFormData({ ...formData, featured_image_url: url });
  };

  const handlePhotoRemove = () => {
    setFormData({ ...formData, featured_image_url: '' });
  };

  const handleContentUploaded = () => {
    // Refresh or update content list if needed
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
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Story
          </Button>
        </div>
      </div>

      {showContentUpload && (
        <ContentUpload onContentUploaded={handleContentUploaded} />
      )}

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingStory ? 'Edit Story' : 'Create New Story'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                placeholder="Story Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                placeholder="Author Name"
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                required
              />
              <Input
                placeholder="Author Title (optional)"
                value={formData.author_title}
                onChange={(e) => setFormData({ ...formData, author_title: e.target.value })}
              />
              
              <div>
                <label className="block text-sm font-medium mb-2">Featured Image</label>
                <PhotoUpload
                  onUpload={handlePhotoUpload}
                  currentImage={formData.featured_image_url}
                  onRemove={handlePhotoRemove}
                />
              </div>

              <Textarea
                placeholder="Story Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                required
              />
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <label>Published</label>
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingStory ? 'Update Story' : 'Create Story'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsCreating(false);
                    setEditingStory(null);
                    setFormData({
                      title: '',
                      content: '',
                      author_name: '',
                      author_title: '',
                      featured_image_url: '',
                      is_published: true,
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        <h2 className="text-2xl font-semibold">Manage Stories</h2>
        {stories.map((story) => (
          <Card key={story.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                  <p className="text-gray-600 mb-2">By {story.author_name} {story.author_title && `- ${story.author_title}`}</p>
                  <p className="text-gray-700 mb-4">{story.content.substring(0, 200)}...</p>
                  <span className={`inline-block px-2 py-1 rounded text-sm ${
                    story.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {story.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(story)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(story.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
