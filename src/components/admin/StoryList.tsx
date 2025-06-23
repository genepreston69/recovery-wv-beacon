
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

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

interface StoryListProps {
  stories: Story[];
  onEdit: (story: Story) => void;
  onDelete: (id: string) => void;
}

export const StoryList = ({ stories, onEdit, onDelete }: StoryListProps) => {
  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-semibold">Manage Stories</h2>
      {stories.map((story) => (
        <Card key={story.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-2">
                  By {story.author_name} {story.author_title && `- ${story.author_title}`}
                </p>
                <p className="text-gray-700 mb-4">{story.content.substring(0, 200)}...</p>
                <span className={`inline-block px-2 py-1 rounded text-sm ${
                  story.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {story.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="flex gap-2 ml-4">
                <Button variant="outline" size="sm" onClick={() => onEdit(story)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(story.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
