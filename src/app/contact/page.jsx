"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong.");
    }
  };

  return (
    <section className="max-w-xl mx-auto px-4 sm:px-6 py-10 font-body">
      <h1 className="text-2xl sm:text-3xl font-heading mb-6 text-center">
        Contact Us
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "name", type: "text", placeholder: "Name", required: true },
          {
            name: "email",
            type: "email",
            placeholder: "Email",
            required: true,
          },
          { name: "phone", type: "tel", placeholder: "Phone Number" },
        ].map(({ name, type, placeholder, required }) => (
          <input
            key={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            value={formData[name]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-3 bg-beige text-darkgreen/50 focus:outline-none focus:ring-2 focus:ring-softgreen"
          />
        ))}

        <textarea
          name="message"
          placeholder="Your message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-3 bg-beige text-darkgreen/50 focus:outline-none focus:ring-2 focus:ring-softgreen"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-softgreen text-white py-3 rounded hover:bg-terracotta transition-colors font-heading"
        >
          Send
        </button>

        {status && <p className="mt-4 text-sm text-center">{status}</p>}
      </form>
    </section>
  );
}
