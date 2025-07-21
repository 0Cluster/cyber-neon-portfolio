"use client";
import GlitchText from "./GlitchText";
import { LuExternalLink } from "react-icons/lu"; // clean minimalist link icon
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import "../../globals.css";
import { Typewriter } from "react-simple-typewriter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAvatarVisibility } from "../../hooks/useAvatarVisibility";
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef(null);
 const { avatarRef } = useAvatarVisibility();
const { setIsAvatarFixed } = useAvatarVisibility();
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.75]);
  const x = useTransform(scrollYProgress, [0, 0.2], [0, -10]);
  const gap = useTransform(scrollYProgress, [0, 0.2], [10, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);


  const icons = [FaGithub, FaLinkedin, FaXTwitter];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
 setIsAvatarFixed(!entry.isIntersecting);
        setVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  return (
    <div className="h-[100vh] w-full relative">
      {/* Sentinel div for visibility trigger */}
      <div
        ref={sentinelRef}
        className="absolute top-[20%] w-full h-[1px]"
      ></div>

<div
  className="glitch-wrapper w-[100%] h-[100vh] drop-shadow-[0_0_25px_rgba(120,208,226,0.4)]"
  style={{ position: "absolute", bottom: 0, right: "1%",margin: 0, padding: 0 }}
>
  <Image
    src="/assets/person2.png"
    alt="person"
    width={1000}
    height={1000}
    className="glitch-img"
  style={{ position: "absolute", bottom: 0, right: "1%",margin: 0, padding: 0 }}
    priority
  />
  <Image
    src="/assets/person2.png"
    alt="person"
    width={1000}
    height={1000}
    className="glitch-img glitch-layer glitch-layer-1"
  style={{ position: "absolute", bottom: 0, right: "1%",margin: 0, padding: 0 }}
    priority
  />
  <Image
    src="/assets/person2.png"
    alt="person"
    width={1000}
    height={1000}
    className="glitch-img glitch-layer glitch-layer-2"
  style={{ position: "absolute", bottom: 0, right: "1%",margin: 0, padding: 0 }}
    priority
  />
  </div>

      <div className="absolute top-[20%] left-[3%] flex items-start flex-col gap-9">
        <div
          className={`flex items-start ${visible ? "relative left-[17%]" : ""}`}
        >
          {/* Avatar Circle */}
<motion.div
  id ="hero-avatar"
  className="z-[50] rounded-full overflow-hidden bg-transparent border-[3px] border-[color:rgba(120,208,226,1)]"
  style={{
    position: visible ? "fixed" : "relative",
    top: visible ? 0 : "auto",
    left: visible ? "2%" : "auto", // 👈 this animates
    width: visible ? "64px" : "80px",
    height: visible ? "64px" : "80px",
    scale: visible ? 0 : scale,
    opacity: visible?0:1,
x: visible ? 0 : x,
    marginRight: gap,
    zIndex: 999,
  }}
>
  <img
    src="https://i.pravatar.cc/80"
    alt="avatar"
    className="w-full h-full object-cover"
  />
</motion.div>

          {/* Icon Circles */}
          {icons.map((Icon, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-transparent flex items-center justify-center border-[0px] border-[color:rgba(120,208,226,1)]"
              style={{
                width: "80px",
                height: "80px",
                scale,
                x,
                opacity,
                marginRight: gap,
              }}
            >
              <Icon size={48} color="rgba(120,208,226,1)" />
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-0">
          <h1 className="text-6xl ml-3 text-white font-bold">
            Hi there! &nbsp;
            <span className="wave" role="img" aria-labelledby="wave">
              👋🏻
            </span>
          </h1>
<GlitchText></GlitchText>
          <div className="w-full h-9"></div>

          <h1 className="text-5xl text-[rgba(120,208,226,1)]">
            <Typewriter
              words={[
                "Web Developer",
                "Blockchain Developer",
                "Data Scientist",
                "Game Developer",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={80}
              delaySpeed={1500}
            />
          </h1>

<div className="relative mt-9 w-fit group">
  <button
    className="relative z-10 px-5 py-2 text-[rgba(120,208,226,1)] font-semibold tracking-wide
               border-2 border-[rgba(120,208,226,0.6)]
               rounded-lg overflow-hidden transition-all duration-300
               hover:bg-[rgba(120,208,226,0.05)]
               hover:scale-105
               transform-gpu
               [clip-path:polygon(0%_0%,calc(100%-16px)_0%,100%_16px,100%_100%,0%_100%)]"
  >
    <span className="relative z-20">Resume</span>

  </button>

  {/* External Link Icon */}
  <LuExternalLink
    size={18}
    className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-20
               text-[rgba(120,208,226,1)]
               transition-transform duration-300 group-hover:scale-120 pointer-events-none"
  />
</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
