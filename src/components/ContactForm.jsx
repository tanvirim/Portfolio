import { useState } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import { defaultColor } from '../constants';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextAreaField = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background-color:${({ color }) => (color ? color : defaultColor)};
  margin-left:60%;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
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
    console.log("click hoytese")

    // Send the email using EmailJS
    emailjs.sendForm('service_omm1e0n', 'template_qmj1gvo', formData)
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert('Email sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('An error occurred while sending the email.');
      });
  };

  return (
    <>

    <FormContainer>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextAreaField
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          />
        <SubmitButton type="submit">Send Email</SubmitButton>
      </form>
    </FormContainer>
          </>
  );
};

export default ContactForm;
