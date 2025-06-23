
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
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

export const SuccessStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="success" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Recovery Success Stories</h2>
          <p className="text-xl text-gray-600 mb-12">Real people, real recovery, real hope</p>
          <div className="text-gray-500">Loading stories...</div>
        </div>
      </section>
    );
  }

  if (stories.length === 0) {
    return (
      <section id="success" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Recovery Success Stories</h2>
          <p className="text-xl text-gray-600 mb-12">Real people, real recovery, real hope</p>
          
          <Card className="bg-gray-50 border-0 shadow-lg">
            <CardContent className="p-12">
              <blockquote className="text-2xl italic text-gray-700 mb-6">
                "Recovery Point gave me more than sobriety - they gave me my life back. 
                Today I'm a certified peer recovery specialist helping others find their way."
              </blockquote>
              <div className="text-blue-600 font-semibold">- Sarah M., Graduate 2023</div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="success" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Recovery Success Stories</h2>
          <p className="text-xl text-gray-600">Real people, real recovery, real hope</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Link key={story.id} to={`/success-story/${story.id}`}>
              <Card className="bg-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6">
                  {story.featured_image_url && (
                    <img 
                      src={story.featured_image_url} 
                      alt={story.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold text-blue-700 mb-3">{story.title}</h3>
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{story.content.length > 150 ? story.content.substring(0, 150) + '...' : story.content}"
                  </blockquote>
                  <div className="text-blue-600 font-semibold">
                    - {story.author_name}{story.author_title && `, ${story.author_title}`}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
