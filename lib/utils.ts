import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { load } from "cheerio";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

  const tableOfContents = extractH2Content(html);

  $("h2").each((_, element) => {
    const text = $(element).text().trim();
    if (text) {
      $(element).attr("id", toKebabCase(text));
    }
  });

  const sanitizedHTML = $.html();

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

function toKebabCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}


