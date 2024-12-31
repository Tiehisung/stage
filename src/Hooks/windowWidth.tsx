"use client";

import { useState, useEffect, SetStateAction } from "react";

export function useViewportWidth() {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window == "undefined") return;

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    const interval = setInterval(() => {
      localStorage.setItem("viewport-width", JSON.stringify(window.innerWidth));
    }, 3000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  return width;
}

export function useSetViewportWidth({
  setViewWidth,
}: {
  setViewWidth?: React.Dispatch<SetStateAction<number>>;
}) {
  useEffect(() => {
    if (typeof window == "undefined") return;

    const handleResize = () => {
      if (setViewWidth) {
        setViewWidth(window.innerWidth);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
}
