"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { calculateReadTime } from "@/lib/utils";
import type { Blog } from "@prisma/client";

export default function LatestBlogs({ latestBlogs }: { latestBlogs: Blog[] }) {
  return (
    <section className="py-12 md:py-20">
      <div className="px-4 md:px-6">
        <h2 className="max-w-8xl pl-4 mb-20 mx-auto text-xl md:text-5xl font-bold font-sans">
          Latest Blogs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
          {latestBlogs.map((blog) => (
            <Link href={`blogs/${blog.slug}`} key={blog.id} className="group">
              <div className="cursor-pointer flex flex-col">
                <div className="overflow-hidden rounded-xl mb-4">
                  <img
                    src={blog.thumbnailUrl || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-full h-[280px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex items-center mb-2 gap-x-2">
                    <p className="text-sm">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{","}
                    </p>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4" />
                      {blog.readTime}
                    </div>
                  </div>

                  <div className="flex gap-2 mb-3">
                    {blog.tags.slice(0, 2).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="rounded-full px-3 py-1 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2 group-hover:text-primary/90 transition-colors">
                    {blog.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkeletonBlogItem() {
  return (
    <div className="cursor-pointer flex flex-col">
      <div className="overflow-hidden rounded-xl mb-4 bg-muted h-[280px]"></div>
      <div className="mt-4">
        <div className="h-4 w-24 bg-muted rounded mb-2"></div>
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-16 bg-muted rounded-full"></div>
          <div className="h-6 w-20 bg-muted rounded-full"></div>
        </div>
        <div className="h-8 w-full bg-muted rounded mb-2"></div>
        <div className="h-8 w-3/4 bg-muted rounded mb-2"></div>
        <div className="h-4 w-32 bg-muted rounded mt-2"></div>
      </div>
    </div>
  );
}
