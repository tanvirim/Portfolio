import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import IconCube from "./IconCube";
import ContactOptions from "./ContactOptions";
import { defaultColor } from "../constants";

const FloatingChat = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Contact options"
          className="fixed bottom-6 right-6 z-50 transition-transform duration-300 hover:scale-110"
        >
          <IconCube
            icon={MessageCircle}
            color={defaultColor}
            size={32}
            label="Contact options"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        collisionPadding={16}
        className="w-64 bg-popover text-popover-foreground border border-border"
      >
        <ContactOptions />
      </PopoverContent>
    </Popover>
  );
};

export default FloatingChat;
