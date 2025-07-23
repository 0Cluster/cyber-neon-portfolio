"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProjectScroll() {
  const projects = [2, 3, 4];
  const numProjects = projects.length + 1;

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scale = useTransform(
    scrollYProgress,
    [0, 0.15],
    isMobile ? [0.7, 0.9] : [1.05, 1]
  );
  const rotate = useTransform(scrollYProgress, [0, 0.15], [20, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);
  const translateT = useTransform(scrollYProgress, [0, 0.15], [0, -250]);
  const x = useTransform(
    scrollYProgress,
    [0.15, 1],
    ["0%", `-${((numProjects - 1) / numProjects) * 100}%`]
  );

  return (
    <section
      ref={sectionRef}
      style={{ height: `${numProjects * 101}vh` }}
      className="relative bg-black"
    >

      <div className="sticky top-0 h-screen bg-black overflow-hidden">
        <motion.div
          style={{
            x,
            width: `${numProjects * 100}vw`,
          }}
          className="flex h-full"
        >
          {/* 🔥 Featured Project */}
          <div
            className="w-screen h-full flex flex-col items-center justify-center bg-black px-6 md:px-16"
            style={{
              perspective: "1000px",
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 150 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-customBlue mb-8 tracking-tight"
              style={{ translateY: translateT }}
            >
              ✨ Featured Project
            </motion.h2>

            <motion.div
              initial={{ rotateX: 20 }}
              style={{
                rotateX: rotate,
                translateY,
                boxShadow:
                  "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
              }}
              className="w-[90vw] p-8 bg-black border-[3px] border-customBlue  rounded-3xl h-[80vh] mt-[80px]  flex flex-col items-center text-center space-y-4"
            >
              <h3 className="text-customBlue text-4xl font-semibold">
                🚀 Portfolio Platform
              </h3>
              <p className="text-white font-semibold text-sm">
                Built using Next.js, Framer Motion, and TailwindCSS. Smooth 3D scroll animations, interactive project reveals, and a glowing aesthetic.
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="#"
                  className="px-5 py-2 text-sm font-medium rounded-full bg-customBlue text-black hover:bg-white transition"
                >
                  Live Demo
                </a>
                <a
                  href="#"
                  className="px-5 py-2 text-sm font-medium rounded-full border border-customBlue text-customBlue hover:bg-customBlue hover:text-black transition"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          </div>

          {/* 🌌 Other Projects */}
          {projects.map((proj, i) => (
            <div
              key={i}
              className="w-screen h-full flex items-center justify-center bg-black"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="w-[90vw] mt-[-30px] p-8 bg-black border-[3px] border-customBlue text-customBlue rounded-3xl h-[80vh]  flex flex-col items-center text-center space-y-4"
              >
                <h3 className="text-customBlue text-4xl font-semibold">
                  🌌 Project {proj}
                </h3>
                <p className="text-white font-semibold text-sm">
                  A creative experiment showcasing smooth parallax scroll, 3D depth effects, and vibrant design transitions.
                </p>
                <div className="flex gap-4 mt-4">
                  <a
                    href="#"
                    className="px-5 py-2 text-sm font-medium rounded-full bg-customBlue text-black hover:bg-white transition"
                  >
                    Live Demo
                  </a>
                  <a
                    href="#"
                    className="px-5 py-2 text-sm font-medium rounded-full border border-customBlue text-customblue hover:bg-customBlue hover:text-black transition"
                  >
                    GitHub
                  </a>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
