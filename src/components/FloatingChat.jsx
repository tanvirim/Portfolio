import { useState } from "react";
import { MessageCircle, Phone, Mail, Copy, Check, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger, PopoverTitle } from "./ui/popover";

const PHONE_DISPLAY = "01912384996";
const PHONE_INTL = "8801912384996"; // BD country code, for wa.me / tel:
const EMAIL = "tanvirimruet@gmail.com";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(
  "Let's connect"
)}`;

const rowClass =
  "group flex items-center gap-3 rounded-lg bg-muted/60 px-3 py-2.5 cursor-pointer transition-all hover:bg-muted hover:scale-[1.02] active:scale-[0.98]";

const EnterIcon = () => (
  <ChevronRight
    size={16}
    className="shrink-0 text-muted-foreground opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
  />
);

const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (field, text) => async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500);
    } catch {
      // clipboard API unavailable in this context — silently ignore
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Contact options"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-110 hover:bg-black/80"
        >
          <MessageCircle size={20} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        collisionPadding={16}
        className="w-64 bg-popover text-popover-foreground border border-border"
      >
        <PopoverTitle className="px-1 mb-1">Get in touch</PopoverTitle>

        <div className="flex flex-col gap-2">
          <a
            href={`https://wa.me/${PHONE_INTL}`}
            target="_blank"
            rel="noopener noreferrer"
            className={rowClass}
          >
            <FaWhatsapp size={20} className="text-[#25D366] shrink-0" />
            <div className="flex flex-col text-left min-w-0 flex-1">
              <span className="text-sm font-medium">WhatsApp</span>
              <span className="text-xs text-muted-foreground truncate">
                {PHONE_DISPLAY}
              </span>
            </div>
            <EnterIcon />
          </a>

          <div className={rowClass}>
            <a
              href={`tel:+${PHONE_INTL}`}
              className="flex items-center gap-3 flex-1 min-w-0"
            >
              <Phone size={20} className="text-blue-500 shrink-0" />
              <div className="flex flex-col text-left min-w-0 flex-1">
                <span className="text-sm font-medium">Call</span>
                <span className="text-xs text-muted-foreground truncate">
                  {PHONE_DISPLAY}
                </span>
              </div>
              <EnterIcon />
            </a>
            <button
              type="button"
              onClick={handleCopy("phone", PHONE_DISPLAY)}
              aria-label="Copy phone number"
              className="shrink-0 p-1.5 rounded-md cursor-pointer hover:bg-background/80 transition-colors"
            >
              {copiedField === "phone" ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} className="text-muted-foreground" />
              )}
            </button>
          </div>

          <div className={rowClass}>
            <a
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 flex-1 min-w-0"
            >
              <Mail size={20} className="text-red-500 shrink-0" />
              <div className="flex flex-col text-left min-w-0 flex-1">
                <span className="text-sm font-medium">Email</span>
                <span className="text-xs text-muted-foreground truncate">
                  {EMAIL}
                </span>
              </div>
              <EnterIcon />
            </a>
            <button
              type="button"
              onClick={handleCopy("email", EMAIL)}
              aria-label="Copy email address"
              className="shrink-0 p-1.5 rounded-md cursor-pointer hover:bg-background/80 transition-colors"
            >
              {copiedField === "email" ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} className="text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FloatingChat;
