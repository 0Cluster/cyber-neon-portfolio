"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAvatarVisibility } from "../../hooks/useAvatarVisibility";

const Navbar = () => {
  const { isAvatarFixed, avatarX } = useAvatarVisibility();
  const [showNavbar, setShowNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setShowNavbar(false); // Hide near top
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(true); // Show on scroll down
      } else {
        setShowNavbar(false); // Hide on scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
console.log("avatarX", avatarX);

  return (
    <AnimatePresence>
      {isAvatarFixed && showNavbar && (
        <motion.nav
          className="fixed top-0 left-0 w-full px-0 py-[2px] h-[64px] z-[100] pr-6 bg-black bg-opacity-60 backdrop-blur-lg border-b border-[rgba(120,208,226,0.2)] flex items-center justify-between"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0, ease: "easeInOut" }}
        >
          {/* Left: Avatar clone */}
          <div className="flex items-center gap-4">
            {isAvatarFixed && (
              <motion.div
                initial={{ opacity: 0, x: avatarX }}
                animate={{ opacity: 1, x: avatarX }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ duration: 0 }}
                className="rounded-full overflow-hidden border-[2px] border-[rgba(120,208,226,1)]  w-[60px] h-[60px] "
              >
                <img
                  src="https://i.pravatar.cc/80"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </div>

          {/* Right: Nav links */}
          <div className="flex gap-8 text-[rgba(120,208,226,1)] font-medium tracking-wide">
            <a href="#home" className="hover:text-white transition">
              Home
            </a>
            <a href="#projects" className="hover:text-white transition">
              Projects
            </a>
            <a href="#about" className="hover:text-white transition">
              About
            </a>
            <a href="#contact" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
