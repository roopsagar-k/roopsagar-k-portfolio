import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

export default function About() {
  return (
    <BentoGrid className="mx-8 md:mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          img={item.img}
          imgClassName={item.imgClassName}
          className={item.className}
          textClassName={item.textClassName}
          globe={item.globe}
          gradient={item.graident}
          stack={item.stack}
        />
      ))}
    </BentoGrid>
  );
}
const items = [
  {
    title: "I prioritize client collaboration, fostering open communication",
    textClassName: "bottom-4 max-w-[40rem]",
    className:
      "col-span-1 md:col-span-3 md:row-span-4 lg:h-[60vh] p-0 overflow-hidden",
    img: "./computer.svg",
    imgClassName: "object-cover w-full h-full",
  },
  {
    title: "I constantly try to improve My tech stack",
    ttextClassName: "-top-1",
    className: "col-span-1 md:col-span-2 md:row-span-2 p-0",
    stack: true,
  },
  {
    title: "Tech enthusiast with a passion for development.",
    className: "col-span-1 md:col-span-2 md:row-span-2 p-0 overflow-hidden",
    img: "./code.svg",
    imgClassName: "absolute mt-[3rem] ml-[3rem]",
  },

  {
    title: "Bringing ideas to life through innovative coding solutions.",
    className: "col-span-1 md:col-span-2 md:row-span-2 p-0 overflow-hidden ",
    img: "./code-skeleton.svg",
    imgClassName: "absolute -bottom-1 right-2",
  },
  {
    title: "I'm very flexible with time zone communications",
    className:
      "col-span-1 md:col-span-3 md:row-span-4 lg:h-[60vh] overflow-hidden",
    textClassName: "top-0",
    globe: true,
  },
  {
    title: "Do you want to start a project together?",
    description: "Let's create something amazing! Reach out to me at ",
    className: "col-span-1 md:col-span-2 md:row-span-2 p-0 overflow-hidden",
    graident: true,
  },
];
