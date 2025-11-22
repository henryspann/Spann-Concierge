import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import IntakePage from "./pages/Intake";



function WaitlistPage() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-8 text-center">
      <h1 className="text-5xl font-bold mb-8" style={{ fontFamily: 'Cinzel, serif' }}>2027 Waitlist</h1>
      <p className="text-gray-300 max-w-3xl mx-auto mb-10 text-lg">
        The <span className="font-semibold text-white">Spann Concierge Insurance Waitlist</span> marks the beginning of a new era in luxury insurance and lifestyle management.
        Our 2027 launch will introduce a fully integrated insurance and concierge ecosystem built for high-net-worth individuals, collectors, and exotic asset owners.
      </p>
      <p className="text-gray-400 max-w-3xl mx-auto mb-12">
        By joining the waitlist, you’ll gain early access to our bespoke insurance solutions, curated vendor partnerships, and exclusive events that define the Spann experience.
        Members will receive early invitations, private onboarding opportunities, and priority access to our concierge network.
      </p>
      <form className="max-w-lg mx-auto space-y-6">
        <input type="text" placeholder="Full Name" className="w-full p-3 rounded bg-neutral-800 text-white" required />
        <input type="email" placeholder="Email Address" className="w-full p-3 rounded bg-neutral-800 text-white" required />
        <Button type="submit" className="bg-white text-black w-full py-3 rounded-xl hover:bg-gray-300">Join the 2027 Waitlist</Button>
      </form>
    </div>
  );
}

function TierPage({ renewalTiers }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const tier = renewalTiers.find((t) => t.id === parseInt(id));

  if (!tier) return <div className="text-center text-white py-20">Tier not found</div>;

  return (
    <div className="relative z-10 min-h-screen bg-black text-white py-24 px-8 text-center">
      <motion.h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>{tier.tier}</motion.h1>
      <p className="text-xl text-gray-300 mb-4">{tier.price}</p>
      <p className="text-gray-400 max-w-2xl mx-auto mb-12">{tier.desc}</p>
      <div className="max-w-2xl mx-auto mb-10 text-left">
        <h2 className="text-2xl font-semibold mb-4">What’s Included</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {tier.includes.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="max-w-lg mx-auto bg-neutral-900/80 border border-neutral-800 rounded-2xl p-8 mb-12">
        <h3 className="text-2xl font-semibold mb-4">Why Upgrade?</h3>
        <p className="text-gray-400 mb-6">
          Each tier unlocks more than service — it’s about trust, speed, and access. Higher tiers mean direct access to
          our private vendor network, reduced turnaround times, and dedicated personal support.
        </p>
        <Button
          className="bg-white text-black w-full py-3 rounded-xl hover:bg-gray-300"
          onClick={() => window.open("https://calendly.com/henry-spannconcierge/30min", "_blank")}
>         Schedule to Join {tier.tier}
        </Button>

      </div>
      <Button className="bg-white text-black py-3 px-8 text-lg rounded-xl hover:bg-gray-300" onClick={() => navigate('/contact')}>
        Proceed to Payment
      </Button>
    </div>
  );
}

function HomePage({ renewalTiers }) {
  const navigate = useNavigate();
  return (
    <div className="relative z-10">
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 text-white" style={{ fontFamily: 'Cinzel, serif' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>Spann Concierge</motion.h1>
        <motion.p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>Private Asset & Lifestyle Management for Discerning Clients</motion.p>
      </section>

      <section className="py-24 bg-neutral-950/80 text-center backdrop-blur-sm">
        <h2 className="text-4xl font-semibold mb-12">Concierge Renewal Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 md:px-20 items-stretch">
          {renewalTiers.map((tier) => (
            <Card key={tier.id} className="bg-neutral-900/90 border border-neutral-800 rounded-2xl flex flex-col justify-between hover:shadow-xl h-full">
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{tier.tier}</h3>
                  <p className="text-gray-100 text-xl mb-4">{tier.price}</p>
                  <p className="text-gray-400 mb-6">{tier.desc}</p>
                </div>
                <Button className="bg-white text-black w-full py-3 rounded-xl hover:bg-gray-300 mt-auto" onClick={() => navigate(`/tier/${tier.id}`)}>View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-24 bg-black/90 text-center">
        <h2 className="text-4xl font-semibold mb-12 text-white">Our Core Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 md:px-20">
          {[
            { title: "Vehicle Logistics", desc: "Enclosed transport, storage coordination, detailing management, and rally support for high-value or exotic automobiles." },
            { title: "Lifestyle Management", desc: "Charters, reservations, personal arrangements, luxury travel coordination, and time-sensitive concierge tasks executed seamlessly." },
            { title: "Asset Concierge", desc: "Oversight, vendor management, and coordination for vehicles, properties, collections, valuables, and premium lifestyle assets." }
          ].map((service, index) => (
            <Card key={index} className="bg-neutral-900/90 border border-neutral-800 rounded-2xl hover:shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-200">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="py-10 bg-black text-center text-gray-600 text-sm">
        <p>© 2025 Spann Concierge. All rights reserved.</p>
      </footer>
    </div>
  );
}

function VendorsPage() {
  const vendorCategories = [
    {
      title: "Automotive Vendors",
      examples: ["Enclosed transport & logistics","Exotic and luxury vehicle detailing","Long-term and short-term storage","Performance tuning and maintenance","Rally support & event transport coordination"]
    },
    {
      title: "Travel & Lifestyle Services",
      examples: ["Private jet and charter bookings","Luxury accommodations & itinerary planning","Restaurant and nightlife reservations","Personal security & VIP access arrangements","Tailored trip and event planning"]
    },
    {
      title: "Property & Asset Services",
      examples: ["Residential and estate management","Property maintenance and repair coordination","Art and collectible storage & transport","Appraisals and valuations","Premium asset oversight"]
    },
    {
      title: "Specialized Concierge Requests",
      examples: ["Access to exclusive events and experiences","High-priority sourcing of hard-to-find items","Professional service coordination","Time-sensitive personal errands","Emergency or urgent request management"]
    },
    {
      title: "How We Choose Our Partners",
      desc: "Every service provider we work with is screened for:",
      examples: ["Professionalism","Discretion","Reliability","Liability coverage","Proven track record with high-net-worth clientele"]
    },
    {
      title: "Your Request, Our Network",
      desc: "For anything outside the usual categories, we activate the right partners instantly — tailored, discreet, and handled without delay.",
      examples: ["Rare-item sourcing","Custom logistics","VIP access","Specialist coordination","Last-minute changes"]
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-28 pb-16 text-white text-center px-6">
      <h1 className="text-5xl font-bold mb-10" style={{ fontFamily: 'Cinzel, serif' }}>Vendor Network</h1>
      <p className="text-gray-300 max-w-3xl mx-auto mb-16 text-lg">
        Our concierge service relies on a hand-built network of premium vendors. These are the partners we leverage to
        deliver fast, high-end results for our clients across automotive, property, and lifestyle services.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {vendorCategories.map((cat, i) => (
          <Card key={i} className="bg-neutral-900/90 border border-neutral-800 rounded-2xl">
            <CardContent>
              <h3 className="text-2xl font-semibold mb-3 text-white">{cat.title}</h3>
              <p className="text-gray-400 mb-4">{cat.desc}</p>
              <ul className="text-gray-300 space-y-1">
                {cat.examples.map((ex, idx) => (
                  <li key={idx}>• {ex}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FormsPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    vehicles: "",
    needs: "",
    urgent: "",
    contactMethod: "email",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-16 text-white px-8 text-center">
      <h1 className="text-5xl font-bold mb-8" style={{ fontFamily: "Cinzel, serif" }}>
        Concierge Intake Form
      </h1>

      <p className="text-gray-300 max-w-xl mx-auto mb-10">
        Complete this form to begin concierge onboarding.  
        Your information goes directly into our concierge pipeline.
      </p>

      <form
        name="intake"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto space-y-6 bg-neutral-900/60 p-10 rounded-2xl border border-neutral-800"
      >
        <input type="hidden" name="form-name" value="intake" />

        <input
          name="name"
          placeholder="Full Name"
          className="w-full p-3 rounded bg-neutral-800 text-white"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-neutral-800 text-white"
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="w-full p-3 rounded bg-neutral-800 text-white"
          onChange={handleChange}
        />

        <select
          name="contactMethod"
          className="w-full p-3 rounded bg-neutral-800 text-white"
          onChange={handleChange}
        >
          <option value="email">Email</option>
          <option value="text">Text</option>
          <option value="call">Call</option>
        </select>

        <textarea
          name="needs"
          placeholder="What do you need help with?"
          className="w-full p-3 rounded bg-neutral-800 text-white h-24"
          onChange={handleChange}
          required
        />

        <textarea
          name="urgent"
          placeholder="Urgent tasks?"
          className="w-full p-3 rounded bg-neutral-800 text-white h-24"
          onChange={handleChange}
        />

        <textarea
          name="vehicles"
          placeholder="Vehicles Owned (optional)"
          className="w-full p-3 rounded bg-neutral-800 text-white h-24"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-white text-black w-full py-3 rounded-xl hover:bg-gray-300"
        >
          Submit Intake
        </button>
      </form>
    </div>
  );
}

export default function SpannConciergeSite() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 400 }, () => ({ x: Math.random() * width - width / 2, y: Math.random() * height - height / 2, z: Math.random() * width }));

    const animate = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = 'white';
      stars.forEach((star) => {
        star.z -= 1.2;
        if (star.z <= 0) star.z = width;
        const k = 128.0 / star.z;
        const px = star.x * k + width / 2;
        const py = star.y * k + height / 2;
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - star.z / width) * 2.5;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }, []);

  const renewalTiers = [
    { id: 1, tier: 'Tier I', price: '$300 / Month', desc: 'You get a reliable go-to operator who handles the everyday tasks you don’t want to deal with — travel planning, logistics, coordination, reminders, and small but time-consuming errands.', includes: ['A dedicated concierge contact — one person you message for everything.','Same-day replies (within 24 hours) for any request.','We schedule and coordinate your vehicle logistics — transports, appointments, upkeep, repairs.','We handle your basic travel arrangements — bookings, reservations, confirmations.','Preferred access to select events and opportunities through our partner network.'] },
    { id: 2, tier: 'Tier II', price: '$500 / Month', desc: 'This tier becomes your personal operations manager. We handle recurring needs, keep your assets running smoothly, coordinate multiple moving parts, and solve problems faster.', includes: ['Priority access — your requests go to the front of the line.','Full concierge support across your cars, properties, scheduling, and lifestyle needs.','Property management assistance — we coordinate cleaners, maintenance, appointments, and services.','Priority vendor booking — we reserve spots with our preferred vendors before the general public.','Weekend emergency support for last-minute situations or time-sensitive needs.'] },
    { id: 3, tier: 'Tier III', price: '$1,000 / Month', desc: 'You get elite, immediate support for every aspect of your lifestyle: travel, vehicles, events, logistics, emergencies, and complex coordination.This is the tier for clients who need speed, privacy, reliability, and concierge-level execution around the clock — without compromise.', includes: ['A 24/7 personal concierge team — call or message anytime, day or night.','Private air, charter, and yacht coordination handled end-to-end.','Access to our highest-tier vendor network with the fastest response times and premium services.','Direct founder contact line for urgent, sensitive, or complex needs.','Rapid turnaround for all requests — same hour, not same day.'] }
  ];

  return (
    <Router>
      <nav className="fixed top-0 left-0 w-full bg-black z-50 text-white flex justify-between items-center px-8 py-4">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl tracking-wide" style={{ fontFamily: 'Cinzel, serif' }}>Spann Concierge</Link>
          <Link to="/waitlist" className="hover:text-gray-400">2027 Waitlist</Link>
        </div>
        <div className="space-x-6">
          <Link to="/vendors" className="hover:text-gray-400">Vendors</Link>
          <Link to="/intake" className="hover:text-gray-400">Forms</Link>

        </div>
      </nav>

      <div className="relative pt-20 min-h-screen bg-black text-white font-sans overflow-hidden">
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage renewalTiers={renewalTiers} />} />
            <Route path="/waitlist" element={<WaitlistPage />} />
            <Route path="/vendors" element={<VendorsPage />} />

            {/* 🚀 BOTH ROUTES NOW LOAD THE SAME CORRECT PAGE */}
            <Route path="/forms" element={<IntakePage />} />
            <Route path="/intake" element={<IntakePage />} />

            <Route path="/tier/:id" element={<TierPage renewalTiers={renewalTiers} />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}
