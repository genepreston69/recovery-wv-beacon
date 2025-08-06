
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StoryList } from './StoryList';
import { StoryForm } from './StoryForm';
import { UserManagement } from './UserManagement';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { PhotoGallery } from './PhotoGallery';
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
  const { user, isAdmin, loading } = useAdminAuth();

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Verifying Access...</h2>
          <p className="text-gray-600">Please wait while we verify your admin privileges.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to access the admin panel.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg border border-red-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-4 text-red-800">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have administrator privileges to access this panel.</p>
          <p className="text-sm text-gray-500">Contact your system administrator if you believe this is an error.</p>
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
            <TabsTrigger value="users">Users</TabsTrigger>
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
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
