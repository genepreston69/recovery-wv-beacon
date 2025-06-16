
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, Image } from 'lucide-react';

interface PhotoUploadProps {
  onUpload: (url: string) => void;
  currentImage?: string;
  onRemove?: () => void;
}

export const PhotoUpload = ({ onUpload, currentImage, onRemove }: PhotoUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file.');
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `success-stories/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('story-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('story-images')
        .getPublicUrl(filePath);

      onUpload(data.publicUrl);
      
      toast({
        title: "Photo uploaded successfully",
        description: "Your image has been uploaded and is ready to use.",
      });
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="file"
            accept="image/*"
            onChange={uploadPhoto}
            disabled={uploading}
            className="cursor-pointer"
          />
        </div>
        {uploading && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Uploading...
          </div>
        )}
      </div>
      
      {currentImage && (
        <div className="relative inline-block">
          <img
            src={currentImage}
            alt="Story featured image"
            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
          />
          {onRemove && (
            <Button
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
              onClick={onRemove}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
      
      <p className="text-xs text-gray-500">
        <Image className="inline w-3 h-3 mr-1" />
        Supported formats: JPG, PNG, GIF. Max size: 5MB.
      </p>
    </div>
  );
};
