"use client";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const technologies = [
    {
      id: 1,
      name: "NextJS",
      image:
        "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
    },
    {
      id: 2,
      name: "ReactJS",
      image:
        "https://www.svgrepo.com/show/354259/react.svg",
    },
    {
      id: 3,
      name: "MongoDB",
      image:
        "https://www.svgrepo.com/show/354090/mongodb.svg",
    },
    {
      id: 4,
      name: "NodeJS",
      image:
        "https://www.svgrepo.com/show/354118/nodejs.svg",
    },
    {
      id: 5,
      name: "PostgreSQL",
      image:
        "https://www.svgrepo.com/show/354200/postgresql.svg",
    },
    {
      id: 6,
      name: "Typescript",
      image:
        "https://www.svgrepo.com/show/439022/typescript.svg",
    },
    {
      id: 7,
      name: "Python",
      image:
        "https://www.svgrepo.com/show/452091/python.svg",
    },
  ];
  
export default function TechStack() {

    return (
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={technologies} />
        </div>
    );
}