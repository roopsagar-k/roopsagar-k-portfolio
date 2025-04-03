import { Metadata } from "next";

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

export default async function Blogs() {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto my-20 sm:px-10 px-5">
      <div className="max-w-7xl w-full">blogs page</div>
    </main>
  );
}
