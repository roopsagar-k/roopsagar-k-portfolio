"use client";
import { Blog } from "@/types/types";
import BlogPostHero from "./BlogPostHero";
import BlogContent from "./BlogContent";
import { calculateReadTime } from "@/lib/utils";
import Footer from "../Footer";

export default function BlogHero({ blog }: { blog: Blog }) {
  // blog.readTime = calculateReadTime(blog.html || "");
  return (
    <div>
      <BlogPostHero blog={blog} />
      <BlogContent blog={blog} />
      <Footer />
    </div>
  );
}
