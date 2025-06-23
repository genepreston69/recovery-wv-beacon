
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Story {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_title?: string;
  featured_image_url?: string;
  created_at: string;
}

const SuccessStory = () => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchStory(id);
    }
  }, [id]);

  const fetchStory = async (storyId: string) => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('id', storyId)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      setStory(data);
    } catch (error) {
      console.error('Error fetching story:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center text-gray-500">Loading story...</div>
          </div>
        </div>
      </>
    );
  }

  if (!story) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-700 mb-4">Story Not Found</h1>
              <Link to="/">
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              {story.featured_image_url && (
                <img 
                  src={story.featured_image_url} 
                  alt={story.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              
              <h1 className="text-3xl font-bold text-blue-700 mb-4">{story.title}</h1>
              
              <div className="text-gray-600 mb-6">
                By {story.author_name}{story.author_title && `, ${story.author_title}`}
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {story.content}
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Published on {new Date(story.created_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SuccessStory;
