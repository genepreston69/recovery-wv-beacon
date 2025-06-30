
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StoryList } from './StoryList';
import { StoryForm } from './StoryForm';
import { useAzureAuth } from '@/hooks/useAzureAuth';
import { PhotoGallery } from './PhotoGallery';
import { ChatAdmin } from './ChatAdmin';

export const AdminPanel = () => {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const { isAuthenticated } = useAzureAuth();

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
            <StoryList onEditStory={setSelectedStoryId} />
          </TabsContent>
          
          <TabsContent value="create">
            <StoryForm storyId={selectedStoryId} onStoryCreated={() => setSelectedStoryId(null)} />
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
