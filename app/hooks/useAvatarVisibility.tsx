"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

type AvatarContextType = {
  isAvatarFixed: boolean;
  avatarX: number;
  setIsAvatarFixed: (val: boolean) => void;
};

const AvatarVisibilityContext = createContext<AvatarContextType>({
  isAvatarFixed: false,
  avatarX: 0,
  setIsAvatarFixed: () => {},
});

export const AvatarVisibilityProvider = ({ children }: { children: ReactNode }) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [isAvatarFixed, setIsAvatarFixed] = useState(false);
  const [avatarX, setAvatarX] = useState(0);

  useEffect(() => {
  const avatar = document.getElementById("hero-avatar");
    if (!avatar) return;

    const initialLeft = avatar.getBoundingClientRect().left;
    setAvatarX(initialLeft); 
    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {
          setIsAvatarFixed(false); // avatar is visible
        } else {
          setIsAvatarFixed(true); // avatar left screen
        }
      },
      {
        threshold: 0.01, // triggers even when avatar just touches screen
      }
    );

    observer.observe(avatar);

    return () => observer.disconnect();
  }, []);

  return (
    <AvatarVisibilityContext.Provider
      value={{ isAvatarFixed, avatarX, setIsAvatarFixed }}
    >
      {children}
    </AvatarVisibilityContext.Provider>
  );
};

export const useAvatarVisibility = () => useContext(AvatarVisibilityContext);
