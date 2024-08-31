"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export default function FloatingNavDemo() {
  const navItems = [
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Projects",
      link: "#projects",
    },
    {
      name: "Testimonials",
      link: "#testimonials",
    },
  ];
  return (
      <FloatingNav navItems={navItems} />
  );
}

