"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const [particles, setParticles] = useState<
    { id: number; top: number; left: number; size: number; duration: number }[]
  >([]);

  useEffect(() => {
    const count = 25;
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 6 + Math.random() * 12,
      duration: 4 + Math.random() * 6,
    }));
    setParticles(generated);
  }, []);

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center bg-black text-white px-4 overflow-hidden"
    >
      {/* 🔵 Particles (behind form) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-customblue/40 blur-2xl opacity-60 z-0"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 💬 Contact Form */}
      <div className="max-w-3xl w-full z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-8 text-customblue"
        >
          Ask Me Anything
        </motion.h2>

        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative backdrop-blur-md bg-white/5 border border-customblue p-8 rounded-3xl shadow-xl space-y-6"
        >
          <div>
            <label className="block text-sm mb-2 text-white/80">Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-customblue"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/80">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-customblue"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/80">Message</label>
            <textarea
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-customblue"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-customblue text-black font-semibold py-3 rounded-xl transition hover:scale-105 hover:shadow-customblue duration-300"
          >
            {submitted ? "Message Sent ✨" : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
