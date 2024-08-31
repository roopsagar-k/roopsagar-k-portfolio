import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/spotlight";
import TechStack from "./TechStack";

export default function Hero() {
  return (
    <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-background/[0.96] antialiased bg-dot-white/[0.2] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-purple-400 bg-opacity-50">
        Transforming Concepts into Seamless User Experiences.
        </h1>
        <p className="mt-4 font-semibold text-2xl text-neutral-300 max-w-lg text-center mx-auto">
            Hi! I'm Roopsagar K, a Full Stack Web Developer from India.
        </p>
        <center className="relative">
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] mt-4 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-7 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                    Show my work
                </span>
            </button>
            <div className="absolute mt-40 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <TechStack />
            </div>
        </center>
      </div>
    </div>
  );
}
