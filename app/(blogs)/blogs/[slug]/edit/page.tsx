"use client";
import { useState, useEffect } from "react";
import { UpdateEditor } from "@/components/UpdateEditor";
import { Toaster } from "@/components/ui/toaster";
import { useParams } from "next/navigation";
import getHTML from "@/actions/getHTML";

const Page = () => {
  const [allowed, setAllowed] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [html, setHtml] = useState("");
  const { slug } = useParams();

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

  useEffect(() => {
    if (!allowed) return;

    (async () => {
      const { data } = await getHTML(slug as string);
      console.log("html", data);
      setHtml(data.html);
      setFeatured(data.isFeatured);
    })();
  }, [allowed, slug]);

  if (!allowed) return null;

  return (
    <div className="flex items-center justify-center w-full">
      <UpdateEditor html={html} slug={slug as string} featured={featured} />
      <Toaster />
    </div>
  );
};

export default Page;
