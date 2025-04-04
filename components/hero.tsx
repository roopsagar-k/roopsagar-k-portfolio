import React from "react";
import { Spotlight } from "./ui/spotlight";
import TechStack from "./TechStack";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-background/[0.96] antialiased overflow-hidden mt-6">
      {/* Background grid */}
      <div className="w-full absolute left-0 bottom-0 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50"
        />
      </div>
      {/* Background Spotlight */}
      {/* <Spotlight
        className="absolute top-0 left-0 w-full h-full md:left-1/2 md:top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        fill="gray"
      /> */}
      {/* Content Container - Matches Projects Section */}
      <div className="relative z-10 flex flex-col items-center md:flex-row-reverse md:items-center justify-between max-w-6xl mx-auto w-full px-4 md:px-8 gap-12">
        {/* Right Section - Avatar (First on Mobile) */}
        <div className="flex justify-center">
          <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 blur-xl opacity-30 animate-pulse" />
            <div className="relative w-full h-full rounded-full border-2 border-purple-500/30 overflow-hidden">
              <Image
                src="/profile-image.jpeg"
                alt="Roopsagar K"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </div>
        </div>

        {/* Left Section - Text */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-purple-400">
            Transforming Concepts into Seamless User Experiences.
          </h1>
          <p className="mt-4 font-semibold text-lg md:text-xl text-neutral-300">
            Hi! I&apos;m Roopsagar K, a Full Stack Web Developer from India.{" "}
            <br />
            Building SaaS, Freelancing, and More.
          </p>
          <div className="flex gap-4 items-center justify-center md:justify-start mt-6">
            <Link
              href={"#projects"}
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-7 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                Show my work
              </span>
            </Link>
            <a
              href="./Roopsagar_K_Resume.pdf"
              download="Roopsagar_K_Resume.pdf"
            >
              <Button className="rounded-full py-2 px-6">Download CV</Button>
            </a>
          </div>
          {/* Tech Stack */}
          <div className="mt-14">
            <TechStack />
          </div>
        </div>
      </div>
    </div>
  );
}
