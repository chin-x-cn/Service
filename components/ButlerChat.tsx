
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToButler } from '../services/geminiService';
import { Send, Mic, Sparkles, Phone, Clock } from 'lucide-react';

interface Props {
  initialMessage?: string;
  onClearInitial?: () => void;
}

export const ButlerChat: React.FC<Props> = ({ initialMessage, onClearInitial }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '张先生您好，我是您的私人管家。无论是订机票、酒店，还是安排家宴，只要吩咐一声，剩下的交给我。',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle incoming initial message from other tabs
  useEffect(() => {
    if (initialMessage) {
      // Small delay to ensure component is mounted and visual transition is smooth
      setTimeout(() => {
        handleSend(initialMessage);
        if (onClearInitial) onClearInitial();
      }, 500);
    }
  }, [initialMessage]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Call Mock Service
    const replyText = await sendMessageToButler(messages, textToSend);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: replyText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-50">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-navy-900 rounded-full flex items-center justify-center text-gold-400 border-2 border-gold-200">
               <Sparkles size={18} />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">金岁专属管家</h2>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <p className="text-xs text-slate-500 font-medium">24小时在线 · 秒级响应</p>
            </div>
          </div>
        </div>
        <button className="w-9 h-9 bg-slate-50 rounded-full flex items-center justify-center text-navy-900 border border-slate-200 shadow-sm active:scale-95 transition-transform">
           <Phone size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <Sparkles size={14} />
              </div>
            )}
            
            <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                <div
                className={`p-4 rounded-2xl text-base leading-relaxed shadow-sm whitespace-pre-wrap ${
                    msg.role === 'user'
                    ? 'bg-navy-900 text-white rounded-tr-sm'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm'
                }`}
                >
                {msg.text}
                </div>
                <div className="flex items-center gap-1 mt-1 px-1">
                   {msg.role === 'model' && <Clock size={10} className="text-slate-300" />}
                   <span className="text-[10px] text-slate-400">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </span>
                </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 animate-pulse">
             <div className="w-8 h-8 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center flex-shrink-0 opacity-50">
                <Sparkles size={14} />
             </div>
             <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100">
                <div className="flex items-center gap-1.5">
                    <span className="text-sm text-slate-500">管家正在为您计算优惠方案...</span>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-end gap-2 bg-slate-50 p-2 rounded-3xl border border-slate-200 focus-within:ring-2 focus-within:ring-navy-900/10 focus-within:border-navy-900 transition-all">
          <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-navy-900 rounded-full hover:bg-white transition-colors" title="按住说话">
            <Mic size={22} />
          </button>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="告诉管家您的需求..."
            rows={1}
            className="flex-1 bg-transparent border-none focus:ring-0 text-base py-3 max-h-24 resize-none placeholder:text-slate-400"
            style={{ minHeight: '44px' }}
          />
          
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                !inputText.trim() || isLoading 
                ? 'bg-slate-200 text-slate-400' 
                : 'bg-navy-900 text-white hover:bg-navy-800 active:scale-95'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
