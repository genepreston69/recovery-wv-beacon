
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CrisisBar = () => {
  const { toast } = useToast();

  const handleCrisisCall = () => {
    window.location.href = 'tel:304-523-4673';
  };

  const handleCrisisChat = () => {
    toast({
      title: "🚨 Crisis Chat Initiated",
      description: "Connecting you with a certified peer recovery specialist. This is a safe, confidential space.",
      duration: 5000,
    });
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <span className="font-semibold">Recovery Point West Virginia</span>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
            onClick={handleCrisisChat}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Crisis Chat
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
            onClick={handleCrisisCall}
          >
            <Phone className="w-4 h-4 mr-1" />
            Call Now
          </Button>
        </div>
      </div>
    </div>
  );
};
