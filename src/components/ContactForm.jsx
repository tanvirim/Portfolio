/* eslint-disable react/prop-types */
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { defaultColor } from "../constants";

const ContactForm = ({ color = defaultColor }) => {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="h-auto py-2.5 px-3 rounded-lg"
      />
      <Input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="h-auto py-2.5 px-3 rounded-lg"
      />
      <Textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
        rows={4}
        className="py-2.5 px-3 rounded-lg"
      />

      <div className="flex items-center justify-between gap-3 mt-1">
        <p className="text-xs text-gray-500 dark:text-gray-500 min-h-[1em]">
          {status === "sent" && "Message sent — thanks!"}
          {status === "error" && "Something went wrong, try again."}
        </p>
        <Button
          type="submit"
          disabled={status === "sending"}
          style={{ backgroundColor: color }}
          className="game-btn shrink-0 flex items-center gap-2 text-black py-2.5 px-6 h-auto rounded-full font-bold disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send Email"}
          <Send size={15} />
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
