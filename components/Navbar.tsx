"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";

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
    // {
    //   name: "Testimonials",
    //   link: "#testimonials",
    // },
    {
      name: "Blogs",
      link: "/blogs",
    },
  ];
  return <FloatingNav navItems={navItems} />;
}
