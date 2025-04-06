import { Metadata } from "next";
import FeaturedBlogs from "@/components/blogs/FeaturedBlogs";
import { prisma } from "@/prisma";
import { Blog } from "@/types/types";
import LatestBlogs from "@/components/blogs/LatestBlogs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";
import Footer from "@/components/Footer";
import { calculateReadTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    absolute: "Roopsagar K Blog | SaaS, Freelancing, and Tech Insights",
  },
  description:
    "Explore Roopsagar K's blog for insights on SaaS development, freelancing, AI, and full-stack web development. Learn about the latest trends in tech, startups, and software engineering.",
  alternates: {
    canonical: "https://roopsagar.tech/blogs",
  },
  keywords: [
    "Roopsagar K blog",
    "freelancing tips",
    "SaaS development",
    "full-stack development",
    "AI in SaaS",
    "startup strategies",
    "web development blog",
    "React and Next.js tutorials",
    "TypeScript best practices",
    "building AI-powered applications",
    "career growth in tech",
    "developer productivity tips",
    "indie hacking insights",
    "remote work strategies",
    "software engineering trends",
  ],
};

async function getFeaturedBlogs(){
  const featuredBlogs = await prisma.blog.findMany({
    where: {
      isFeatured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return featuredBlogs;
}

async function getLatestBlogs() {
  const latestBlogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });
  return latestBlogs;
}

export default async function Blogs() {
  let [featuredBlogs, latestBlogs] = await Promise.all([
    getFeaturedBlogs(),
    getLatestBlogs(),
  ]);

  

  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto mt-10 mb-20 sm:px-10 px-5">
      {/* Full Page Background Grid */}
      <div className="fixed inset-0 w-full h-screen -z-10">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl w-full">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="flex items-center gap-2 text-lg text-foreground/70"
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg">Blogs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <FeaturedBlogs featuredBlogs={featuredBlogs} />
        <LatestBlogs latestBlogs={latestBlogs} />
        <Footer />
      </div>
    </main>
  );
}
