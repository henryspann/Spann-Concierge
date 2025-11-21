import React, { useState } from "react";

export default function IntakePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicles: "",
    request: "",
    urgent: "",
    preferredContact: ""
  });

  const [status, setStatus] = useState("");

  function updateField(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/.netlify/functions/submitIntake", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Submitted successfully!");
      } else {
        setStatus("Error: " + data.error);
      }
    } catch (err) {
      setStatus("Failed: " + err.toString());
    }
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Concierge Intake Form</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={updateField} />
        <input name="email" placeholder="Email" onChange={updateField} />
        <input name="phone" placeholder="Phone" onChange={updateField} />
        <textarea name="vehicles" placeholder="Vehicles Owned (optional)" onChange={updateField} />
        <textarea name="request" placeholder="Initial Request" onChange={updateField} />
        <textarea name="urgent" placeholder="Urgent Tasks (optional)" onChange={updateField} />
        <input name="preferredContact" placeholder="Preferred Contact" onChange={updateField} />

        <button className="bg-black text-white py-2">Submit</button>
      </form>

      <p className="mt-4">{status}</p>
    </div>
  );
}
