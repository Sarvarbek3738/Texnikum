import { useState, useEffect } from 'react';
import { Bot, Send, X, ExternalLink, Sparkles } from 'lucide-react';

export function TelegramBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  // Auto show tooltip after 3 seconds on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasDismissed) {
        setIsOpen(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasDismissed]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Tooltip / Popup Card */}
      {isOpen && (
        <div 
          className="pointer-events-auto mb-3 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-sky-100 dark:border-sky-950 p-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
        >
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0088cc] to-[#229ED9] flex items-center justify-center text-white shadow-md">
                  <Bot size={22} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  Rasmiy Yordamchi Bot
                  <Sparkles size={13} className="text-amber-400" />
                </h4>
                <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  Online • 24/7 xizmatda
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setHasDismissed(true);
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Yopish"
            >
              <X size={15} />
            </button>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3.5">
            Qabul jarayoni, yo'nalishlar, dars jadvallari va savollaringizga rasmiy Telegram botimiz orqali tezkor javob oling!
          </p>

          <a
            href="https://t.me/Far5techbot"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3.5 bg-gradient-to-r from-[#0088cc] to-[#229ED9] hover:from-[#0077b5] hover:to-[#1d8bc0] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 transition-all group"
          >
            <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
            <span>@Far5techbot ga yozish</span>
            <ExternalLink size={13} className="opacity-70" />
          </a>
        </div>
      )}

      {/* Floating Main Button */}
      <div className="relative pointer-events-auto">
        <button
          onClick={() => {
            if (isOpen) {
              window.open('https://t.me/Far5techbot', '_blank');
            } else {
              setIsOpen(true);
            }
          }}
          className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-[#0088cc] via-[#1ba0e2] to-[#229ED9] text-white shadow-xl shadow-sky-500/35 hover:shadow-2xl hover:shadow-sky-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          title="Telegram Bot: @Far5techbot"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-sky-400 opacity-30 animate-ping"></span>

          <div className="relative flex items-center justify-center">
            <Bot size={26} className="transition-transform group-hover:rotate-12 duration-300" />
          </div>

          {/* Tiny Telegram badge on corner */}
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-gray-900 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-[#229ED9] shadow-sm">
            <Send size={10} />
          </span>
        </button>
      </div>
    </div>
  );
}
