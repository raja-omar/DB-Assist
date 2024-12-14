'use client';

import { useState } from 'react';
import axios from 'axios';
import { ChatSidebar } from '@/components/chat-sidebar';
import { ChatMessages } from '@/components/chat-messages';
import { ChatInput } from '@/components/chat-input';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

interface Conversation {
  id: string;
  title: string;
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: '1', title: 'New Conversation' },
  ]);
  const [currentConversation, setCurrentConversation] = useState('1');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleNewChat = () => {
    const newId = (conversations.length + 1).toString();
    setConversations([
      ...conversations,
      { id: newId, title: `New Conversation ${newId}` },
    ]);
    setCurrentConversation(newId);
    setMessages([]);
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversation(id);
    setMessages([]);
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: (messages.length + 1).toString(),
      content,
      role: 'user',
    };

    setMessages([...messages, userMessage]);
    setLoading(true);

    try {
      // Mock endpoint for now, will be replaced with actual endpoint later
      const response = await axios.post('http://127.0.0.1:8000/api/mock/chat', {
        conversation_id: currentConversation,
        messages: [...messages, userMessage].map(({ role, content }) => ({
          role,
          content,
        })),
      });

      const aiMessage: Message = {
        id: (messages.length + 2).toString(),
        content: response.data.content,
        role: response.data.role,
      };
      console.log(aiMessage);
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        conversations={conversations}
        currentConversation={currentConversation}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
      />
      <div className="flex-1 flex flex-col mt-[12.5%]">
        <ChatMessages messages={messages} onExampleClick={handleExampleClick} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
