/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import RichTextEditor from "./RichTextEditor";
import { defaultColor } from "../constants";

// Staggered 3D pop-in for each field — tilts up out of the page instead of
// just fading, matching the game-card / modal-3d language used elsewhere.
const fieldVariants = {
  hidden: { opacity: 0, y: 26, rotateX: -20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

const fieldLabelClass =
  "mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400";

const ContactForm = ({ color = defaultColor }) => {
  const formRef = useRef(null);
  const editorRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({ name: "", email: "", subject: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [messageError, setMessageError] = useState(false);
  const [messageHtml, setMessageHtml] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editorRef.current?.isEmpty()) {
      setMessageError(true);
      return;
    }
    setMessageError(false);
    setStatus("sending");

    // sendForm's third argument must be the form element itself (it reads
    // input values off it by their `name` attributes) — not a plain object.
    // The Tiptap editor isn't a native form control, so its HTML is synced
    // into the hidden `message` textarea below on every edit instead.
    emailjs
      .sendForm("service_omm1e0n", "template_qmj1gvo", e.target)
      .then(() => {
        setStatus("sent");
        setFormData({ name: "", email: "", subject: "" });
        editorRef.current?.clear();
        setMessageHtml("");
        setTimeout(() => setStatus("idle"), 3000);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setStatus("error");
      });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="contact-form-3d flex flex-col gap-5"
      style={{ "--field-accent": color }}
    >
      <motion.div
        custom={0}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fieldVariants}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="contact-field-3d">
          <label className={fieldLabelClass}>Name</label>
          <Input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="h-auto py-2.5 px-3 rounded-lg"
          />
        </div>

        <div className="contact-field-3d">
          <label className={fieldLabelClass}>Email</label>
          <Input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="h-auto py-2.5 px-3 rounded-lg"
          />
        </div>
      </motion.div>

      <motion.div
        custom={1}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fieldVariants}
        className="contact-field-3d"
      >
        <label className={fieldLabelClass}>Subject</label>
        <Input
          type="text"
          name="subject"
          placeholder="What's this about?"
          value={formData.subject}
          onChange={handleChange}
          required
          className="h-auto py-2.5 px-3 rounded-lg"
        />
      </motion.div>

      <motion.div
        custom={2}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fieldVariants}
        className="contact-field-3d"
      >
        <label className={fieldLabelClass}>Message</label>
        <RichTextEditor
          ref={editorRef}
          placeholder="Tell me about your project…"
          onChange={(editor) => {
            setMessageHtml(editor.getHTML());
            if (messageError) setMessageError(false);
          }}
        />
        {/* sendForm reads plain named form controls off the DOM — the
            Tiptap editor above isn't one, so its HTML is mirrored here on
            every edit purely so the existing submit path can pick it up. */}
        <textarea name="message" value={messageHtml} readOnly hidden />
        {messageError && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
            <AlertCircle size={12} /> Please write a message.
          </p>
        )}
      </motion.div>

      <motion.div
        custom={3}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fieldVariants}
        className="flex items-center justify-between gap-3 mt-1"
      >
        <p className="text-xs min-h-[1.2em] flex items-center">
          <AnimatePresence mode="wait">
            {status === "sent" && (
              <motion.span
                key="sent"
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.9 }}
                transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"
              >
                <CheckCircle2 size={14} /> Message sent — thanks!
              </motion.span>
            )}
            {status === "error" && (
              <motion.span
                key="error"
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.9 }}
                transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex items-center gap-1.5 text-red-500"
              >
                <AlertCircle size={14} /> Something went wrong, try again.
              </motion.span>
            )}
          </AnimatePresence>
        </p>
        <Button
          type="submit"
          variant="game"
          size="game"
          disabled={status === "sending"}
          color={color}
          className="shrink-0 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send Email"}
          <Send size={15} />
        </Button>
      </motion.div>
    </form>
  );
};

export default ContactForm;
