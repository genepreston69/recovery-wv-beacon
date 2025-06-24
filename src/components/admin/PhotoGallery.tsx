
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Trash2, Search, Check } from 'lucide-react';

interface PhotoGalleryProps {
  onPhotoSelect?: (url: string) => void;
  selectedPhoto?: string;
}

export const PhotoGallery = ({ onPhotoSelect, selectedPhoto }: PhotoGalleryProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('story-images')
        .list('', {
          limit: 100,
          offset: 0,
        });

      if (error) throw error;

      const photoUrls = data
        .filter(file => file.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/))
        .map(file => {
          const { data: urlData } = supabase.storage
            .from('story-images')
            .getPublicUrl(file.name);
          return urlData.publicUrl;
        });

      setPhotos(photoUrls);
    } catch (error: any) {
      toast({
        title: "Error fetching photos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file.');
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('story-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      toast({
        title: "Photo uploaded successfully",
        description: "Your image has been added to the gallery.",
      });

      fetchPhotos();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = async (photoUrl: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      const fileName = photoUrl.split('/').pop();
      if (!fileName) throw new Error('Invalid photo URL');

      const { error } = await supabase.storage
        .from('story-images')
        .remove([fileName]);

      if (error) throw error;

      toast({
        title: "Photo deleted successfully",
      });

      fetchPhotos();
    } catch (error: any) {
      toast({
        title: "Error deleting photo",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredPhotos = photos.filter(photo => 
    photo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Photo Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500">Loading photos...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Photo Gallery
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              onChange={uploadPhoto}
              disabled={uploading}
              className="w-auto cursor-pointer"
            />
            {uploading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search photos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>

        {filteredPhotos.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {searchTerm ? 'No photos found matching your search.' : 'No photos in gallery. Upload some images to get started.'}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, index) => (
              <div key={index} className="relative group">
                <div 
                  className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedPhoto === photo ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                  }`}
                  onClick={() => onPhotoSelect?.(photo)}
                >
                  <img
                    src={photo}
                    alt={`Gallery photo ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  {selectedPhoto === photo && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePhoto(photo);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
