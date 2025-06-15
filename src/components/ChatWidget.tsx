
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ChatWidget = () => {
  const { toast } = useToast();

  const handleChatClick = () => {
    toast({
      title: "💬 Live Chat",
      description: "Hi! I'm here to help. Whether you need immediate support or just have questions about our programs, I'm ready to listen.",
      duration: 5000,
    });
  };

  return (
    <div 
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg z-40"
      onClick={handleChatClick}
    >
      <MessageCircle className="w-6 h-6" />
    </div>
  );
};
