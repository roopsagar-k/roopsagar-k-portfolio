"use client";
import { sendMail } from "@/lib/actions";
import Link from "next/link";
import { SparklesCore } from "./ui/sparkles";
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";
import { socialMedia } from "@/lib/utils";

const Footer = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail && !validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address before submitting");
      return;
    }

    if (!firstName || !lastName || !message) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const response = await sendMail(email, firstName, lastName, message);
    if (response.success) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setSuccessMessage(
        "Thanks for reaching out! I'll get back to you shortly."
      );
      setErrorMessage("");
      setEmailError("");
    } else {
      setErrorMessage(
        "Oops! Something went wrong while sending your message. Please try again."
      );
      setSuccessMessage("");
    }
  };



  return (
    <footer
      className="relative w-full md:pt-20 py-10 px-4 md:px-28"
      id="contact"
    >
      {/* Background grid */}
      <div className="w-full absolute left-0 bottom-0 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-purple-400 bg-opacity-50">
          Get in Touch
        </h1>
        <div className="w-full max-w-[40rem] h-5 md:h-10 relative">
          <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] md:w-3/4 w-5/6 blur-sm" />
          <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px md:w-3/4 w-5/6" />
          <div className="absolute inset-x-20 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] md:w-1/4 w-1/2 blur-sm" />
          <div className="absolute inset-x-20 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px md:w-1/4 w-1/2" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center"
          action=""
        >
          <div className="relative z-[100000] flex flex-col md:flex-row gap-7 max-w-[60rem] md:min-w-[60rem] p-5">
            <div className="flex flex-col gap-5">
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="min-w-[20rem]"
                type="text"
                placeholder="First Name"
                required
              />
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
                required
              />
              <div className="flex flex-col gap-1">
                <Input
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="Email"
                  className={emailError ? "border-destructive" : ""}
                  required
                />
                {emailError && (
                  <span className="text-xs text-destructive">{emailError}</span>
                )}
              </div>
            </div>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-40 md:h-auto"
              placeholder="Type your message here."
              required
            />
          </div>
          <button
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] mt-4 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            disabled={!!emailError}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span
              className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-7 py-2 text-sm font-medium text-white backdrop-blur-3xl ${
                emailError ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Submit
            </span>
          </button>
          {errorMessage && (
            <p className="text-destructive mt-4">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-700 mt-4">{successMessage}</p>
          )}
        </form>
        <p className="text-white-200 mt-10 my-5 text-center">
          I&apos;m excited to hear from you! Whether you have a project in mind,
          want to discuss potential opportunities,
          <br /> or just want to connect, feel free to reach out.
        </p>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="w-full text-xs md:text-base md:font-normal font-light text-center md:text-left">
          Copyright © {new Date().getFullYear()} Roopsagar K
        </p>

        <div className="flex items-center md:gap-3 gap-6 mt-4 md:mt-0">
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
