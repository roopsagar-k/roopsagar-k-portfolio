"use client";
import { sendMail } from "@/lib/actions";
import Link from "next/link";
import { SparklesCore } from "./ui/sparkles";
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea"
import { FormEvent, useState } from "react";

const Footer = () => {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const response = await sendMail(email, firstName, lastName, message);
      if(response.success) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setSuccessMessage("Thanks for reaching out! I’ll get back to you shortly.");
        setErrorMessage("");
      } else {
        setErrorMessage("Oops! Something went wrong while sending your message. Please try again.");
        setSuccessMessage("");
      }
    }


    const socialMedia = [
        {
            id: 1,
            img: "./git.svg",
            href: "https://github.com/roopsagar-k",
        },
        {
            id: 2,
            img: "./link.svg",
            href: "https://www.linkedin.com/in/roopsagar-k/",
        },
        {
            id: 3,
            img: "./twit.svg",
            href: "https://x.com/RoopsagarU",
        }
    ]
    return (
      <footer className="relative w-full pt-20 pb-10 px-28" id="contact">
        {/* background grid */}
        <div className="w-full absolute left-0 bottom-0 min-h-96">
          <img
            src="/footer-grid.svg"
            alt="grid"
            className="w-full h-full opacity-50 "
          />
        </div>
  
        <div className="flex flex-col items-center">
          <h1 className="text-2xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-purple-400 bg-opacity-50">
            Get in Touch
          </h1>
          <div className="w-[40rem] h-10 relative">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-center" action="">
            <div className="relative z-[100000] flex gap-7 min-w-[60rem] p-5">
              <div className="flex flex-col gap-5">
                <Input 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="min-w-[20rem]" 
                  type="text" 
                  placeholder="First Name" />
                <Input 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text" 
                  placeholder="Last Name" />
                <Input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email" 
                  placeholder="Email" />
                </div>
              <Textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here." />
            </div>
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] mt-4 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-7 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                      Submit
                  </span>
            </button>
            {errorMessage !== null && <p className="text-destructive mt-4">{errorMessage}</p>}
            {successMessage !== null && <p className="text-green-700 mt-4">{successMessage}</p>}
          </form>
          <p className="text-white-200 md:mt-10 my-5 text-center">
            I&apos;m excited to hear from you! Whether you have a project in mind, want to discuss potential opportunities,<br/> or just want to connect, feel free to reach out. 
          </p>
        </div>
        <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
            <p className="md:text-base text-sm md:font-normal font-light">
                Copyright © {new Date().getFullYear()} Roopsagar K
            </p>

  
          <div className="flex items-center md:gap-3 gap-6">
            {socialMedia.map((info) => (
              <Link
                key={info.id}
                href={info.href}
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
              >
                <img src={info.img} alt="icons" width={20} height={20} />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;