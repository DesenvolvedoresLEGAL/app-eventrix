
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const uploadFile = async (file: File, bucket: string, folder: string): Promise<string | null> => {
    console.log('🚀 Starting file upload:', { fileName: file.name, size: file.size, bucket, folder });
    
    setIsUploading(true);
    
    // Create a timeout promise to prevent infinite hanging
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        console.error('⏰ Upload timeout after 30 seconds');
        reject(new Error('Upload timeout - operation took too long'));
      }, 30000); // 30 second timeout
    });

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      console.log('📁 Generated file path:', filePath);

      // Race between upload and timeout
      const uploadPromise = supabase.storage
        .from(bucket)
        .upload(filePath, file);

      const { error: uploadError, data: uploadData } = await Promise.race([
        uploadPromise,
        timeoutPromise
      ]);

      console.log('📤 Upload result:', { uploadError, uploadData });

      if (uploadError) {
        console.error('❌ Upload error details:', uploadError);
        toast({
          title: "Erro no upload",
          description: uploadError.message,
          variant: "destructive",
        });
        return null;
      }

      console.log('✅ Upload successful, getting public URL...');

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      console.log('🔗 Public URL generated:', urlData.publicUrl);

      return urlData.publicUrl;
      
    } catch (error: any) {
      console.error('💥 Upload exception:', error);
      
      const errorMessage = error.message || "Erro inesperado durante o upload do arquivo";
      
      toast({
        title: "Erro no upload",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
      
    } finally {
      console.log('🏁 Upload process finished, resetting upload state');
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading };
};
