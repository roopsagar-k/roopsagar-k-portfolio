import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/spotlight";
import TechStack from "./TechStack";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="relative h-screen w-full rounded-md flex flex-col items-center justify-center bg-background/[0.96] antialiased bg-dot-white/[0.2] overflow-hidden">
      <Spotlight
        className="absolute top-0 left-0 w-full h-full md:left-1/2 md:top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        fill="white"
      />
      <div className="p-4 max-w-7xl md:mt-36 mx-auto relative z-10 w-full flex flex-col items-center text-center md:text-center">
        <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-purple-400 bg-opacity-50">
          Transforming Concepts into Seamless User Experiences.
        </h1>
        <p className="mt-4 font-semibold text-2xl text-neutral-300 max-w-lg">
          Hi! I&apos;m Roopsagar K, a Full Stack Web Developer from India.
        </p>
        <div className="flex gap-3 items-center justify-center mt-4">
          <Link href={"#projects"} className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-7 py-2 text-sm font-medium text-white backdrop-blur-3xl">
              Show my work
            </span>
          </Link>
          <a href="./Roopsagar_K_Resume.pdf" download="Roopsagar_K_Resume.pdf">
            <Button className="rounded-full py-2">Download CV</Button>
          </a>
        </div>
        <div className="mt-20 flex w-full justify-center">
          <TechStack />
        </div>
      </div>
    </div>
  );
}
