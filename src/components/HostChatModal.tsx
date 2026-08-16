import React, { useState } from 'react';
import { Phone, Crown, Send, User, Sparkles, CheckCircle2, Car, Globe } from 'lucide-react';
import { DestinationCity, SupportedCurrency } from '../types';
import { convertCurrency } from '../data/globalDestinationsData';

interface HostChatModalProps {
  city: DestinationCity;
  currency: SupportedCurrency;
  onClose: () => void;
  onBookVIP: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'host' | 'user';
  text: string;
  timestamp: string;
}

export const HostChatModal: React.FC<HostChatModalProps> = ({
  city,
  currency,
  onClose,
  onBookVIP
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'host',
      text: `Hey! I'm ${city.hostName}, Head VIP Host for our premier venues in ${city.name}, ${city.country}. How can I help make your party legendary tonight? Need free hotel pickup or a custom package?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    `Tell me about the $100 Weekend Package (Fri night – Sun eve)`,
    `How does having 100+ models at our service work?`,
    `How does the free pickup & transit service work in ${city.name}?`,
    `We have a bachelor party of 8 guys visiting ${city.name}`
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    // Dynamic Host Responses
    setTimeout(() => {
      let replyText = `Awesome! We'd love to host your squad in ${city.name}. All our VIP packages include OVER 100+ MODELS/GIRLS AT YOUR SERVICE, free hotel pickup, waived door covers, and reserved VIP booths!`;
      const lower = query.toLowerCase();

      if (lower.includes('bitcoin') || lower.includes('pay') || lower.includes('btc') || lower.includes('receipt') || lower.includes('address') || lower.includes('whatsapp')) {
        replyText = `Our official Bitcoin deposit address is: **12D4ZCSfHvqnLqnoLpSaGfPqNkFLEEjSBw**\n\nAfter sending payment, please email your receipt to **joinsexcompany@gmail.com** or send a WhatsApp message (Messages Only) to **+1 (385) 260-0342** for instant activation & vehicle dispatch!`;
      } else if (lower.includes('weekend') || lower.includes('100$') || lower.includes('$100') || lower.includes('sunday')) {
        replyText = `Our new **$100 Weekend All-Access VIP Pass** gives you full 3-day continuous access from Friday Night (8 PM) all the way through Sunday Evening (11 PM)! It includes unlimited free VIP transit rides all weekend, zero door covers, reserved booths, and over 100+ gorgeous models at your service continuously!`;
      } else if (lower.includes('model') || lower.includes('girl') || lower.includes('dancer') || lower.includes('entertainer')) {
        replyText = `Every VIP Package includes access to over 100+ stunning exotic models, dancers, and hostesses at your service across 3 performance stages, private VIP suites, and runway lounges!`;
      } else if (lower.includes('limo') || lower.includes('bus') || lower.includes('hotel') || lower.includes('pickup')) {
        replyText = `Our free VIP pickup & transit service picks up your group from ANY hotel in ${city.name} (${city.topHotels.map(h => h.name).slice(0, 3).join(', ')}, etc.). Plus, your driver can make a free 10-minute beverage stop en route!`;
      } else if (lower.includes('bachelor') || lower.includes('guys') || lower.includes('birthday') || lower.includes('stag')) {
        const goldPrice = convertCurrency(250, currency).formatted;
        replyText = `For bachelor and stag groups visiting ${city.name}, our ${goldPrice} Gold Bachelor Package is unbeatable! It covers up to 8 guests, includes roundtrip VIP vehicle pickup, leather VIP runway booth, table carafes, cash for dancers, and 100+ models at your service!`;
      } else if (lower.includes('byob') || lower.includes('liquor') || lower.includes('alcohol') || lower.includes('bottle') || lower.includes('drink')) {
        if (city.byobAllowed) {
          replyText = `Yes! In ${city.name}, adult cabarets are BYOB friendly under our ${city.minLegalAge}+ totally nude license. You can bring your own sealed bottles of tequila, vodka, whiskey, beers, or champagne. We provide free craft ice, highball glassware, and citrus garnishes at your booth!`;
        } else {
          replyText = `In ${city.name}, we provide premium VIP bottle service and exotic hookah lounges with dedicated table hostesses serving your booth throughout the evening!`;
        }
      } else if (lower.includes('age') || lower.includes('id') || lower.includes('old')) {
        replyText = `The legal minimum entry age in ${city.name} is strictly ${city.minLegalAge}+ years old. All guests MUST bring an unexpired physical government photo ID (Driver's License or Passport). Digital photos of IDs are not permitted by local law.`;
      }

      const hostMsg: ChatMessage = {
        id: `host-${Date.now()}`,
        sender: 'host',
        text: replyText,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, hostMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-zinc-950 border-2 border-amber-400 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col h-[600px] text-left">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border-b border-zinc-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-rose-600 flex items-center justify-center text-black font-bold">
                <Crown className="w-6 h-6" />
              </div>
              <span className="w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black absolute bottom-0 right-0" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white font-serif uppercase tracking-tight">
                  {city.hostName}
                </h3>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono font-bold">
                  {city.name} Host
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                {city.featuredVenues[0]?.name || 'VIP Concierge'} • Online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/13852600342?text=Hello%20VIP%20Host,%20I%20have%20a%20question%20regarding%20packages%20and%20reservations."
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-xl border border-emerald-500/40 text-[11px] font-mono font-bold flex items-center gap-1 transition"
            >
              <span>WhatsApp</span>
            </a>
            <a
              href="mailto:joinsexcompany@gmail.com?subject=Host%20Inquiry%20-%20Little%20Darlings%20VIP"
              className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-amber-300 rounded-xl border border-zinc-700 text-[11px] font-mono font-bold transition"
            >
              <span>Email</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs font-mono"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-950/80">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs font-mono ${
                  msg.sender === 'user'
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <span
                  className={`text-[9px] block mt-1 ${
                    msg.sender === 'user' ? 'text-black/70' : 'text-zinc-500'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-xs font-mono text-zinc-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span>{city.hostName.split(' ')[0]} is typing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="p-2 bg-zinc-900/60 border-t border-zinc-800 overflow-x-auto flex gap-1.5">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-[10px] font-mono text-amber-300 hover:text-amber-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-2.5 py-1 rounded-full whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Message ${city.hostName.split(' ')[0]} in ${city.name}...`}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-zinc-950 border border-zinc-700 px-3.5 py-2.5 rounded-xl text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 bg-amber-400 hover:bg-amber-300 text-black rounded-xl"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Footer CTA */}
        <div className="p-2.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono px-4">
          <span className="text-zinc-400">Ready to lock in your night?</span>
          <button
            onClick={() => {
              onClose();
              onBookVIP();
            }}
            className="text-amber-400 hover:underline font-bold"
          >
            Open Booking Wizard →
          </button>
        </div>
      </div>
    </div>
  );
};
