import React, { useState } from "react";

export default function IntakePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicles: "",
    request: "",
    urgent: "",
    preferredContact: "Email",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/.netlify/functions/submitIntake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert(response.ok ? "Submitted!" : "Error submitting form");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-3xl font-bold mb-6">Concierge Intake Form</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-black/40 backdrop-blur-md p-6 rounded-lg space-y-4 border border-white/10"
      >
        {/* FULL NAME */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white text-black"
          required
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white text-black"
          required
        />

        {/* PHONE */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white text-black"
          required
        />

        {/* PREFERRED CONTACT – DROPDOWN */}
        <select
          name="preferredContact"
          value={form.preferredContact}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white text-black cursor-pointer"
        >
          <option>Email</option>
          <option>Phone</option>
          <option>Either</option>
        </select>

        {/* INITIAL REQUEST */}
        <textarea
          name="request"
          placeholder="What do you need help with?"
          value={form.request}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white text-black"
          rows={3}
          required
        />

        {/* URGENT TASKS */}
        <textarea
          name="urgent"
          placeholder="Urgent tasks? (optional)"
          value={form.urgent}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white text-black"
          rows={3}
        />

        {/* VEHICLES OWNED */}
        <textarea
          name="vehicles"
          placeholder="Vehicles Owned (optional)"
          value={form.vehicles}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white text-black"
          rows={2}
        />

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-white text-black font-semibold py-3 rounded hover:bg-gray-300 transition"
        >
          Submit Intake
        </button>
      </form>
    </div>
  );
}
