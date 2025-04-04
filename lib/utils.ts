import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { load } from "cheerio";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}


export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export function parseBlogContent(html: string): {
  title: string | null;
  excerpt: string | null;
  sanitizedHTML: string;
  tableOfContents: string[];
} {
  const $ = load(html);

  const title = $("h1").first().text() || null;
  const excerpt = $("p.excerpt").first().text() || null;

  $("h2").each((_, element) => {
    const text = $(element).text().trim();
    if (text) {
      $(element).attr("id", toKebabCase(text));
    }
  });

  const tableOfContents = $("h2")
    .map((_, h2) => {
      let text = $(h2).text();
      return text.replace(/^\d+\.\s*/, "").trim();
    })
    .get();

  const sanitizedHTML = $.html();
  console.log("tableOfContents", tableOfContents);

  return { title, excerpt, sanitizedHTML, tableOfContents };
}


function extractH2Content(htmlStr: string) {
  const $ = load(htmlStr);

  let h2Content = $("h2")
    .map((_, h2) => {
      let text = $(h2).text();
      return text.replace(/^\d+\.\s*/, "").trim();
    })
    .get();

  return h2Content;
}

export function toKebabCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}


export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const imageReadTime = 12; 

  const wordCount = content.split(/\s+/).length;
  const base64Count = (content.match(/data:image\/[^;]+;base64,/g) || [])
    .length;

  const textReadTimeMinutes = wordCount / wordsPerMinute;
  const imageReadTimeMinutes = (base64Count * imageReadTime) / 60;
  const totalReadTimeMinutes = Math.ceil(
    textReadTimeMinutes + imageReadTimeMinutes
  );

  return `${totalReadTimeMinutes} min read`;
}

  export const socialMedia = [
    {
      id: 1,
      img: "/git.svg",
      href: "https://github.com/roopsagar-k",
    },
    {
      id: 2,
      img: "/link.svg",
      href: "https://www.linkedin.com/in/roopsagar-k/",
    },
    {
      id: 3,
      img: "/twit.svg",
      href: "https://x.com/RoopsagarU",
    },
  ];

  


