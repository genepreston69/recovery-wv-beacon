
import React from 'react';
import { format } from 'date-fns';
import { ChatMessage as ChatMessageType } from '@/hooks/useChat';

interface ChatMessageProps {
  message: ChatMessageType;
  isOwn: boolean;
}

export const ChatMessage = ({ message, isOwn }: ChatMessageProps) => {
  const isSystem = message.message_type === 'system';
  const isStaff = message.is_staff && !isSystem;

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isSystem
            ? 'bg-gray-100 text-gray-700 text-center text-sm'
            : isOwn
            ? 'bg-blue-600 text-white'
            : isStaff
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {!isSystem && !isOwn && isStaff && (
          <div className="text-xs font-semibold mb-1 text-green-600">
            Support Team
          </div>
        )}
        <div className="whitespace-pre-wrap break-words">
          {message.content}
        </div>
        <div
          className={`text-xs mt-1 ${
            isSystem
              ? 'text-gray-500'
              : isOwn
              ? 'text-blue-100'
              : 'text-gray-500'
          }`}
        >
          {format(new Date(message.created_at), 'HH:mm')}
        </div>
      </div>
    </div>
  );
};
