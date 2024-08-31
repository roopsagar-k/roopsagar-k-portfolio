"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";


const testimonials = [
  {
    quote:
      "Roopsagar is extremely talented in the technical skills. He owns a kind and helpful nature. The best thing about him is he is reliable and flexible. He is a Gentleman ",
    name: "Ruqhaiya Asif",
    title: "Computer Science Engineer",
    github: "",
  },
  {
    quote:
      "It's a great time working with you 🙌.",
    name: "Vanamuthu V",
    title: "Full Stack Developer",
    github: "vanamuthuV",
  },
  {
    quote: "He's an hard working and ambitious person.. Given a task he gives his all effort to get it done... Above all these he's a good human being.. Always down to earth and helping in nature.. ",
    name: "Siddhi Singh Rathor",
    title: "Student",
    github: "siddhisinghrathor",
  },
  {
    quote:
      "He is very hardworking person and also deliver work on time.",
    name: "Utsav kumar",
    title: "Student",
    github: "jhautsav14",
  },
  {
    quote:
      "Good boy",
    name: "Saad Syed Kaleemulla",
    title: "NA",
    github: "Saad-SYEDk",
  },
];



export default function Testimonials() {
  return (
    <div className="h-[30rem] mt-10 rounded-md flex flex-col antialiased bg-white dark:bg-background items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
        className="scale-125"
      />
    </div>
  );
}
