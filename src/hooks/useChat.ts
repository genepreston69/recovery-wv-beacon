
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'system' | 'escalation';
  is_staff: boolean;
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string | null;
  status: 'active' | 'closed' | 'escalated';
  assigned_to: string | null;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Initialize or get existing conversation
  const initializeConversation = useCallback(async () => {
    if (!user) return;

    try {
      // Check if user has an active conversation
      const { data: existingConversation, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (convError) throw convError;

      if (existingConversation) {
        setConversation(existingConversation);
        await loadMessages(existingConversation.id);
      } else {
        // Create new conversation
        const { data: newConversation, error: createError } = await supabase
          .from('conversations')
          .insert({
            user_id: user.id,
            title: 'Support Chat',
            status: 'active',
            priority: 'normal'
          })
          .select()
          .single();

        if (createError) throw createError;

        setConversation(newConversation);
        
        // Send welcome message
        await supabase
          .from('chat_messages')
          .insert({
            conversation_id: newConversation.id,
            sender_id: user.id,
            content: 'Hello! How can we help you today?',
            message_type: 'system',
            is_staff: true
          });
      }
    } catch (error: any) {
      console.error('Error initializing conversation:', error);
      toast({
        title: "Error",
        description: "Failed to initialize chat",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  // Load messages for a conversation
  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "Failed to load chat messages",
        variant: "destructive",
      });
    }
  };

  // Send a message
  const sendMessage = async (content: string) => {
    if (!user || !conversation || !content.trim()) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversation.id,
          sender_id: user.id,
          content: content.trim(),
          message_type: 'text',
          is_staff: false
        });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    if (!conversation) return;

    const channel = supabase
      .channel('chat_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversation.id}`
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversation]);

  // Initialize conversation when user is available
  useEffect(() => {
    if (user) {
      initializeConversation();
    }
  }, [user, initializeConversation]);

  return {
    messages,
    conversation,
    loading,
    sending,
    sendMessage,
    initializeConversation
  };
};
