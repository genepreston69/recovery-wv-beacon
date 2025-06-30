
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatInterface } from './chat/ChatInterface';
import { useAzureAuth } from '@/hooks/useAzureAuth';
import { useToast } from '@/hooks/use-toast';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAzureAuth();
  const { toast } = useToast();

  const handleChatClick = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to start a chat with our support team.",
        duration: 5000,
      });
      return;
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div 
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg z-40"
        onClick={handleChatClick}
      >
        <MessageCircle className="w-6 h-6" />
      </div>
      
      <ChatInterface isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
