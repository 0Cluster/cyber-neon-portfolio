"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  { id: 1, title: "PROJECT 1", color: "#0ff" },
  { id: 2, title: "PROJECT 2", color: "#f0f" },
  { id: 3, title: "PROJECT 3", color: "#ff0" },
  { id: 4, title: "PROJECT 4", color: "#0f0" },
];

export default function ProjectsSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Horizontal scroll transform in vw
  const x = useTransform(
    scrollYProgress,
    [0.05, 1],
    ["0vw", `-${100 * (projects.length - 1)}vw`]
  );

  // Title animation for first project
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.05], [1, 0.9]);
  const titleY = useTransform(scrollYProgress, [0, 0.05], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="relative h-[450vh] bg-black text-white overflow-hidden"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-screen flex items-center justify-center">
        <motion.div
          style={{ x }}
          className="flex h-full w-[400vw]" // 4 projects * 100vw
        >
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="w-screen h-full flex items-center justify-center"
              style={{ backgroundColor: project.color }}
            >
              {idx === 0 ? (
                <motion.h2
                  className="text-6xl font-bold"
                  style={{
                    opacity: titleOpacity,
                    scale: titleScale,
                    y: titleY,
                  }}
                >
                  {project.title}
                </motion.h2>
              ) : (
                <h2 className="text-4xl font-semibold">{project.title}</h2>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
