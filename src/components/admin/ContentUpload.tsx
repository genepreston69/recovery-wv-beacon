
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, FileText, Image } from 'lucide-react';

interface ContentUploadProps {
  onContentUploaded: () => void;
}

export const ContentUpload = ({ onContentUploaded }: ContentUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [contentType, setContentType] = useState<'image' | 'document'>('image');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const uploadContent = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select a file to upload.');
      }

      const file = event.target.files[0];
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `content/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('story-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('story-images')
        .getPublicUrl(filePath);

      // Here you could save metadata to a content table if needed
      // For now, we'll just show success and reset the form
      
      toast({
        title: "Content uploaded successfully",
        description: `${file.name} has been uploaded and is ready to use.`,
      });

      // Reset form
      setTitle('');
      setDescription('');
      event.target.value = '';
      onContentUploaded();
      
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Button
            variant={contentType === 'image' ? 'default' : 'outline'}
            onClick={() => setContentType('image')}
            className="flex items-center gap-2"
          >
            <Image className="w-4 h-4" />
            Images
          </Button>
          <Button
            variant={contentType === 'document' ? 'default' : 'outline'}
            onClick={() => setContentType('document')}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Documents
          </Button>
        </div>

        <Input
          placeholder="Content title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Content description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="space-y-2">
          <Input
            type="file"
            accept={contentType === 'image' ? 'image/*' : '.pdf,.doc,.docx,.txt'}
            onChange={uploadContent}
            disabled={uploading}
            className="cursor-pointer"
          />
          {uploading && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              Uploading...
            </div>
          )}
        </div>
        
        <p className="text-xs text-gray-500">
          {contentType === 'image' 
            ? "Supported formats: JPG, PNG, GIF. Max size: 10MB." 
            : "Supported formats: PDF, DOC, DOCX, TXT. Max size: 10MB."}
        </p>
      </CardContent>
    </Card>
  );
};
