/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { defaultColor } from "../constants";

const ContactForm = ({ color }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("click hoytese");

    // Send the email using EmailJS
    emailjs
      .sendForm("service_omm1e0n", "template_qmj1gvo", formData)
      .then((response) => {
        console.log("Email sent successfully:", response);
        alert("Email sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("An error occurred while sending the email.");
      });
  };

  return (
    <div className="max-w-[400px] mx-auto p-5 border border-[#ccc] rounded-[5px]">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="h-auto w-full py-2.5 px-2.5 mb-2.5 border-[#ccc] rounded-[5px]"
        />
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="h-auto w-full py-2.5 px-2.5 mb-2.5 border-[#ccc] rounded-[5px]"
        />
        <Textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full py-2.5 px-2.5 mb-2.5 border-[#ccc] rounded-[5px]"
        />
        <Button
          type="submit"
          style={{ backgroundColor: color ? color : defaultColor }}
          className="game-btn ml-[60%] text-white py-2.5 px-6 h-auto rounded-full font-bold"
        >
          Send Email
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
