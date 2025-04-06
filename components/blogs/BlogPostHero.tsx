"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { socialMedia } from "@/lib/utils";
import Link from "next/link";
import { Blog } from "@/types/types";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";

const BlogPostHero = ({ blog }: { blog: Blog }) => {
  return (
    <div className="relative w-full h-auto min-h-[80vh] md:h-[70vh]">
      {/* Breadcrumb - now properly aligned with content */}
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-0 pt-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="flex items-center gap-2 text-sm md:text-lg text-foreground/70"
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/blogs"
                className="flex items-center gap-2 text-sm md:text-lg text-foreground/70"
              >
                Blogs
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm md:text-lg">
                {blog.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/footer-grid.svg"
          alt="background grid"
          fill
          className="object-cover opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-[80rem] gap-x-8 mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-0 h-full py-12 md:py-0 -mt-4">
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {blog.title}
            </h1>
          </div>

          <div className="flex flex-col space-y-3 items-start">
            <div className="flex items-center space-x-3">
              <div>
                <p className="text-lg sm:text-xl font-semibold">Roopsagar K</p>
                <p className="text-base sm:text-lg text-gray-400">
                  Full-stack Developer | Freelancer | Building AI-powered SaaS
                  Solutions
                </p>
              </div>
            </div>
            <p className="text-base sm:text-lg text-gray-400">
              {formatDate(blog.createdAt!)} | {blog.readTime} 
            </p>
            <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-4">
              {socialMedia.map((info) => (
                <Link
                  key={info.id}
                  href={info.href}
                  className="w-9 h-9 sm:w-10 sm:h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 hover:scale-110 transition-transform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={info.img}
                    alt={`${
                      info.id === 1
                        ? "GitHub"
                        : info.id === 2
                        ? "LinkedIn"
                        : "Twitter"
                    } icon`}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0">
          <div className="relative aspect-video w-full h-auto md:h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={blog.thumbnailUrl}
              alt={blog.title || "Blog thumbnail"}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostHero;
