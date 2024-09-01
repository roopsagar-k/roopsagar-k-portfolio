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
      "He is skilled in designing attractive and user-friendly webpage structures. Proficient with modern design tools, he creates engaging and responsive layouts. His work combines visual appeal with functionality.",
    name: "Shashmith S",
    title: "Student",
    github: "",
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
      "Roopsagar is a talented individual, he has experience in full stack development technologies. He is also a good team player.",
    name: "Sairamkumar M",
    title: "Student",
    github: "sairamkumarm",
  },
  {
    quote:
      "He is diligent person, always been an helping hand for others. ",
    name: "Roshni T S",
    title: "Student",
    github: "Roshni56",
  },
];



export default function Testimonials() {
  return (
    <div className="md:h-[30rem] mt-0 md:mt-10 rounded-md flex flex-col antialiased bg-white dark:bg-background items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
        className="scale-75 md:scale-125"
      />
    </div>
  );
}
