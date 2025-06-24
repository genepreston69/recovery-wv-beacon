
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PenTool, Upload, Layout, Home, LightBulb, HelpCircle, Plus, Info } from 'lucide-react';
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
  const [activeSection, setActiveSection] = useState('overview');

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
    setActiveSection('create-story');
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

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home, section: 'Getting Started' },
    { id: 'create-story', label: 'Create a Story', icon: PenTool, section: 'Core Functions' },
    { id: 'upload-images', label: 'Upload Images', icon: Upload, section: 'Core Functions' },
    { id: 'manage-content', label: 'Manage Content', icon: Layout, section: 'Core Functions' },
    { id: 'best-practices', label: 'Best Practices', icon: LightBulb, section: 'Resources' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, section: 'Resources' },
  ];

  const groupedNavItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof navigationItems>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-64 flex-shrink-0">
          <nav className="sticky top-24 space-y-1">
            {Object.entries(groupedNavItems).map(([section, items], sectionIndex) => (
              <div key={section} className={`pb-4 ${sectionIndex > 0 ? 'border-t border-gray-200 pt-4' : ''}`}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{section}</h3>
                <ul className="space-y-1">
                  {items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-all ${
                          activeSection === item.id
                            ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600 font-medium'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl">
            {/* Overview Section */}
            {activeSection === 'overview' && (
              <>
                <div className="mb-12">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">CMS Administration Guide</h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Master the essential functions: creating stories, uploading images, and managing content.
                  </p>
                </div>

                {/* Core Function Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div 
                    className="group border border-gray-200 rounded-xl p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setActiveSection('create-story')}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <PenTool className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Create Stories</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Write and publish engaging content with rich text formatting and media integration.
                    </p>
                  </div>

                  <div 
                    className="group border border-gray-200 rounded-xl p-6 hover:border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setActiveSection('upload-images')}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Upload className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Manage your media library with drag-and-drop uploads and automatic optimization.
                    </p>
                  </div>

                  <div 
                    className="group border border-gray-200 rounded-xl p-6 hover:border-purple-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setActiveSection('manage-content')}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <Layout className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Manage Content</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Organize and edit your existing stories and media files.
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="text-2xl font-bold text-gray-900">{stories.length}</div>
                    <div className="text-sm text-gray-600">Total Stories</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="text-2xl font-bold text-gray-900">{stories.filter(s => s.is_published).length}</div>
                    <div className="text-sm text-gray-600">Published Stories</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="text-2xl font-bold text-gray-900">{stories.filter(s => !s.is_published).length}</div>
                    <div className="text-sm text-gray-600">Draft Stories</div>
                  </div>
                </div>
              </>
            )}

            {/* Create Story Section */}
            {activeSection === 'create-story' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6 pb-3 border-b border-gray-200">
                    Create a Story
                  </h2>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-semibold text-blue-800 mb-1">Story Guidelines</h3>
                        <p className="text-sm text-blue-700">
                          Stories are content-focused articles perfect for news, blogs, and updates. 
                          Include a compelling title, clear content, and author information.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Story Form</h3>
                    <Button 
                      onClick={() => setIsCreating(!isCreating)}
                      variant={isCreating ? "outline" : "default"}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {isCreating ? 'Cancel' : 'New Story'}
                    </Button>
                  </div>
                </div>

                {isCreating && (
                  <StoryForm
                    editingStory={editingStory}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    onCancel={resetForm}
                  />
                )}
              </div>
            )}

            {/* Upload Images Section */}
            {activeSection === 'upload-images' && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  Media Management
                </h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Button 
                      variant={showContentUpload ? "default" : "outline"}
                      onClick={() => {
                        setShowContentUpload(!showContentUpload);
                        setShowPhotoGallery(false);
                      }}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Content
                    </Button>
                    <Button 
                      variant={showPhotoGallery ? "default" : "outline"}
                      onClick={() => {
                        setShowPhotoGallery(!showPhotoGallery);
                        setShowContentUpload(false);
                      }}
                    >
                      <Layout className="w-4 h-4 mr-2" />
                      Photo Gallery
                    </Button>
                  </div>

                  {showContentUpload && (
                    <ContentUpload onContentUploaded={handleContentUploaded} />
                  )}

                  {showPhotoGallery && (
                    <PhotoGallery />
                  )}
                </div>
              </div>
            )}

            {/* Manage Content Section */}
            {activeSection === 'manage-content' && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  Manage Content
                </h2>
                
                <StoryList 
                  stories={stories}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            )}

            {/* Best Practices Section */}
            {activeSection === 'best-practices' && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  Best Practices
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Content Writing</h3>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>• Write clear, scannable headlines</li>
                      <li>• Use short paragraphs and bullet points</li>
                      <li>• Include relevant keywords naturally</li>
                      <li>• Add alt text to all images</li>
                      <li>• Proofread before publishing</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Image Management</h3>
                    <ul className="text-sm text-green-800 space-y-2">
                      <li>• Use descriptive file names</li>
                      <li>• Organize with folders and tags</li>
                      <li>• Optimize images before upload</li>
                      <li>• Maintain consistent aspect ratios</li>
                      <li>• Compress large files</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Help Section */}
            {activeSection === 'help' && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  Help & Support
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Tasks</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Creating Content</h4>
                        <p className="text-sm text-gray-600">Use the sidebar navigation to access story creation tools and media upload features.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Managing Stories</h4>
                        <p className="text-sm text-gray-600">Edit or delete existing stories from the Manage Content section.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-3">Need Help?</h3>
                    <p className="text-sm text-yellow-800">
                      If you encounter any issues or need assistance, please contact the technical support team.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
