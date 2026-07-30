/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

const ToolbarButton = ({ onClick, active, label, children }) => (
  <button
    type="button"
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    aria-label={label}
    aria-pressed={active}
    className={`rounded-md p-1.5 transition-colors cursor-pointer hover:bg-muted ${
      active ? "bg-muted text-[var(--field-accent)]" : "text-muted-foreground"
    }`}
  >
    {children}
  </button>
);

// A lightweight WYSIWYG editor for the contact form's message field —
// exposes `getHTML`/`getText`/`isEmpty`/`clear` imperatively so the parent
// form can read/reset it around a native emailjs `sendForm` submit, which
// otherwise only knows how to read plain `<input>`/`<textarea>` values.
const RichTextEditor = forwardRef(function RichTextEditor(
  { placeholder = "Write your message…", onChange },
  ref
) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: "",
    onUpdate: ({ editor }) => onChange?.(editor),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[120px] px-3 py-2.5",
      },
    },
  });

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML() ?? "",
    getText: () => editor?.getText() ?? "",
    isEmpty: () => editor?.isEmpty ?? true,
    clear: () => editor?.commands.clearContent(),
  }));

  return (
    <div className="rounded-lg border border-input bg-transparent overflow-hidden transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
      <div className="flex items-center gap-1 border-b border-input px-2 py-1.5">
        <ToolbarButton
          label="Bold"
          active={editor?.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor?.isActive("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italic size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Bullet list"
          active={editor?.isActive("bulletList")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <List size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor?.isActive("orderedList")}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={14} />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
});

export default RichTextEditor;
