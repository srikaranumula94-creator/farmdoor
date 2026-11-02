import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCheck } from 'lucide-react';

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const defaultPhone = '919876543210';
  const quickQuestions = [
    'When will tomorrow morning orders be harvested?',
    'How do you ensure zero pesticide vegetables?',
    'Can I place a bulk order for my housing society?',
    'I want to register as a farmer to sell my crops.'
  ];

  const handleSendWhatsApp = (textToSend) => {
    const query = encodeURIComponent(textToSend || message || "Hello Farmdoor Team! I want to enquire about fresh vegetable delivery.");
    window.open(`https://wa.me/${defaultPhone}?text=${query}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-emerald-700/40 hover:scale-105 active:scale-95 transition-all duration-300 font-semibold text-sm cursor-pointer border-2 border-white/40"
          aria-label="WhatsApp Customer Support"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-white" />
            <span className="w-2.5 h-2.5 bg-green-300 rounded-full absolute -top-1 -right-1 border-2 border-emerald-600 animate-pulse"></span>
          </div>
          <span>Farmer Helpdesk</span>
        </button>
      )}

      {/* Popover Chat Support Card */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-slide-up">
          {/* Card Header */}
          <div className="bg-emerald-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center border-2 border-emerald-400">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  Farmdoor WhatsApp Support
                  <CheckCheck className="w-4 h-4 text-emerald-300" />
                </h4>
                <p className="text-[11px] text-emerald-100">Typically replies within 3 minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-emerald-50/40 max-h-72 overflow-y-auto space-y-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-xs border border-emerald-100 text-xs text-slate-700 leading-relaxed">
              👋 Namaste! Welcome to <strong>Farmdoor</strong>. 
              We connect you directly to certified organic and natural farmers. How can our agri-helpdesk assist you today?
            </div>

            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
              Quick Questions:
            </div>

            <div className="space-y-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendWhatsApp(q)}
                  className="w-full text-left text-xs bg-white hover:bg-emerald-50 p-2.5 rounded-xl border border-slate-200/80 hover:border-emerald-300 text-slate-800 transition-all font-medium flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{q}</span>
                  <span className="text-emerald-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendWhatsApp();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type your message to chat..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-emerald-500 focus:bg-white"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-colors shadow-xs"
              title="Open WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
