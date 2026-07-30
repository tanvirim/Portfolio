/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
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

const ContactForm = ({ color = defaultColor }) => {
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // sendForm's third argument must be the form element itself (it reads
    // input values off it by their `name` attributes) — not a plain object.
    emailjs
      .sendForm("service_omm1e0n", "template_qmj1gvo", e.target)
      .then(() => {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
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
      className="contact-form-3d flex flex-col gap-4"
      style={{ "--field-accent": color }}
    >
      <motion.div
        custom={0}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fieldVariants}
        className="contact-field-3d"
      >
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="h-auto py-2.5 px-3 rounded-lg"
        />
      </motion.div>

      <motion.div
        custom={1}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fieldVariants}
        className="contact-field-3d"
      >
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
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
        <Textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="py-2.5 px-3 rounded-lg"
        />
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
