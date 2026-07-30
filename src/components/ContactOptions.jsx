import { useState } from "react";
import { Phone, Mail, Copy, Check, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { PopoverTitle } from "./ui/popover";

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

// The WhatsApp/Call/Email quick-contact rows, shared between FloatingChat
// (the fixed corner bubble) and the Contact section's terminal-header
// trigger — same three ways to reach out, same popover content, wherever
// it's opened from.
const ContactOptions = () => {
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
    <>
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
    </>
  );
};

export default ContactOptions;
