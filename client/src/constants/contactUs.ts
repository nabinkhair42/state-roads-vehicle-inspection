import { Phone, Mail, MapPin } from "lucide-react";

export const ContactContent = [
  {
    title: "Contact Us",
    description:
      "We're here to help and answer any question you might have. We look forward to hearing from you.",
  },
];

export const contactInfo = [
  { icon: Phone, title: "Phone", value: "03 9850 8000" },
  { icon: Mail, title: "Email", value: "support@autoinspector.com.au" },
  { icon: MapPin, title: "Address", value: "123 Business St, City, Country" },
];

export const contactForm = {
  title: "Send us a message",
  description: "We'll get back to you as soon as possible.",

  fields: [
    {
      label: "Full Name",
      name: "Enter your full name",
      type: "text",
      placeholder: "John Doe",
    },
    {
      label: "Email Address",
      name: "Enter your email address",
      type: "email",
      placeholder: "",
    },
    {
      label: "Phone Number",
      name: "Enter your phone number",
      type: "tel",
      placeholder: "",
    },
    {
      label: "Message",
      name: "Enter your message",
      type: "textarea",
      placeholder: "",
    },
  ],
  submit: {
    label: "Send Message",
  },
};
