import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAzureAuth } from '@/hooks/useAzureAuth';
import { format } from 'date-fns';

interface Conversation {
  id: string;
  user_id: string;
  title: string | null;
  status: 'active' | 'closed' | 'escalated';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
}

interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'system' | 'escalation';
  is_staff: boolean;
  created_at: string;
}

export const ChatAdmin = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  const { user } = useAzureAuth();

  // Load conversations
  const loadConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .in('status', ['active', 'escalated'])
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setConversations((data || []) as Conversation[]);
    } catch (error: any) {
      console.error('Error loading conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      });
    }
  };

  // Load messages for selected conversation
  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []) as ChatMessage[]);
    } catch (error: any) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    }
  };

  // Send reply
  const sendReply = async () => {
    if (!selectedConversation || !user || !replyText.trim()) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: selectedConversation.id,
          sender_id: user.localAccountId,
          content: replyText.trim(),
          message_type: 'text',
          is_staff: true
        });

      if (error) throw error;
      setReplyText('');
    } catch (error: any) {
      console.error('Error sending reply:', error);
      toast({
        title: "Error",
        description: "Failed to send reply",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  // Update conversation status
  const updateConversationStatus = async (status: 'active' | 'closed' | 'escalated') => {
    if (!selectedConversation) return;

    try {
      const { error } = await supabase
        .from('conversations')
        .update({ status })
        .eq('id', selectedConversation.id);

      if (error) throw error;
      
      setSelectedConversation({ ...selectedConversation, status });
      loadConversations();
      
      toast({
        title: "Success",
        description: `Conversation ${status}`,
      });
    } catch (error: any) {
      console.error('Error updating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to update conversation",
        variant: "destructive",
      });
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    loadConversations();

    const conversationsChannel = supabase
      .channel('admin_conversations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations'
        },
        () => {
          loadConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(conversationsChannel);
    };
  }, []);

  // Set up messages subscription for selected conversation
  useEffect(() => {
    if (!selectedConversation) return;

    loadMessages(selectedConversation.id);

    const messagesChannel = supabase
      .channel('admin_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${selectedConversation.id}`
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
    };
  }, [selectedConversation]);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'escalated':
        return <Badge variant="destructive">Escalated</Badge>;
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="h-[600px] flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold">Active Conversations</h3>
        </div>
        <ScrollArea className="h-[550px]">
          <div className="p-2 space-y-2">
            {conversations.map((conversation) => (
              <Card
                key={conversation.id}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selectedConversation?.id === conversation.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(conversation.priority)}
                      <span className="font-medium text-sm">
                        {conversation.title || 'Support Chat'}
                      </span>
                    </div>
                    {getStatusBadge(conversation.status)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(new Date(conversation.updated_at), 'MMM dd, HH:mm')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{selectedConversation.title || 'Support Chat'}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge(selectedConversation.status)}
                  {getPriorityIcon(selectedConversation.priority)}
                  <span className="text-sm text-gray-500 capitalize">
                    {selectedConversation.priority} Priority
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateConversationStatus('escalated')}
                  disabled={selectedConversation.status === 'escalated'}
                >
                  Escalate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateConversationStatus('closed')}
                  disabled={selectedConversation.status === 'closed'}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Close
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.is_staff ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.is_staff
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="whitespace-pre-wrap break-words">
                        {message.content}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          message.is_staff ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {format(new Date(message.created_at), 'HH:mm')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Reply Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 min-h-[60px]"
                  disabled={sending}
                />
                <Button
                  onClick={sendReply}
                  disabled={!replyText.trim() || sending}
                  className="px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};
