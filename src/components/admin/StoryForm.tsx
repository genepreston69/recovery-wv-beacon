
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { PhotoUpload } from './PhotoUpload';
import { PhotoGallery } from './PhotoGallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

interface StoryFormProps {
  editingStory: Story | null;
  formData: {
    title: string;
    content: string;
    author_name: string;
    author_title: string;
    featured_image_url: string;
    is_published: boolean;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const StoryForm = ({ 
  editingStory, 
  formData, 
  setFormData, 
  onSubmit, 
  onCancel 
}: StoryFormProps) => {
  const [activeTab, setActiveTab] = useState('upload');

  const handlePhotoUpload = (url: string) => {
    setFormData({ ...formData, featured_image_url: url });
  };

  const handlePhotoSelect = (url: string) => {
    setFormData({ ...formData, featured_image_url: url });
  };

  const handlePhotoRemove = () => {
    setFormData({ ...formData, featured_image_url: '' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingStory ? 'Edit Story' : 'Create New Story'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="upload">Upload New</TabsTrigger>
                <TabsTrigger value="gallery">Choose from Gallery</TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
                <PhotoUpload
                  onUpload={handlePhotoUpload}
                  currentImage={formData.featured_image_url}
                  onRemove={handlePhotoRemove}
                />
              </TabsContent>
              <TabsContent value="gallery">
                <PhotoGallery
                  onPhotoSelect={handlePhotoSelect}
                  selectedPhoto={formData.featured_image_url}
                />
              </TabsContent>
            </Tabs>
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
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
