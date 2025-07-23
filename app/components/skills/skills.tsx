"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  SiSpringboot,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVim,
  SiTypescript,
  SiGithub,
  SiMysql,
} from "react-icons/si";

const skills = [
  { name: "Spring Boot", icon: <SiSpringboot />, level: "Intermediate" },
  { name: "React", icon: <SiReact />, level: "Advanced" },
  { name: "Next.js", icon: <SiNextdotjs />, level: "Intermediate" },
  { name: "TailwindCSS", icon: <SiTailwindcss />, level: "Advanced" },
  { name: "Neovim", icon: <SiVim />, level: "Power User" },
  { name: "GitHub", icon: <SiGithub />, level: "Confident" },
  { name: "MySQL", icon: <SiMysql />, level: "Solid" },
  { name: "TypeScript", icon: <SiTypescript />, level: "Decent" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section id="skills" className="py-16 px-6 h-[80vh] sm:px-12">
 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[30vh] rounded-full 
                        bg-[rgba(120,208,226,0.2)] blur-3xl z-0 pointer-events-none" />
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-[rgba(120,208,226,1)] mb-10"
      >
        ⚡ Skills
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={item}
            className="group p-5 border border-[rgba(120,208,226,0.4)] bg-black/10 rounded-2xl 
                       transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(120,208,226,0.7)]"
          >
            <div className="flex items-center space-x-3 mb-1 text-[rgba(120,208,226,1)]">
              <span className="text-2xl group-hover:animate-pulse">
                {skill.icon}
              </span>
              <p className="text-lg font-semibold group-hover:tracking-wider transition-all">
                {skill.name}
              </p>
            </div>
            <p className="text-sm text-[rgba(120,208,226,0.7)]">{skill.level}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
