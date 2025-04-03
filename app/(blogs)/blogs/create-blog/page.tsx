"use client";
import { Editor } from "@/components/blogs/Editor";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <>
      <div className="flex item-center justify-center w-full">
        <Editor />
        <Toaster />
      </div>
    </>
  );
}
