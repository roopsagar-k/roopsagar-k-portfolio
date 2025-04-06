"use client";
import { useEffect, useState } from "react";
import { Editor } from "@/components/blogs/Editor";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem("creator_key");
    if (key === process.env.NEXT_PUBLIC_BLOG_CREATOR_KEY) {
      setAllowed(true);
    } else {
      const input = prompt("Enter blog creator key");
      if (input === process.env.NEXT_PUBLIC_BLOG_CREATOR_KEY) {
        localStorage.setItem("creator_key", input);
        setAllowed(true);
      } else {
        alert("Access Denied");
      }
    }
  }, []);

  if (!allowed) return null;

  return (
    <div className="flex items-center justify-center w-full">
      <Editor />
      <Toaster />
    </div>
  );
}
