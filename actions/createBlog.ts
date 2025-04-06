"use server";
import { calculateReadTime, generateSlug, parseBlogContent } from "@/lib/utils";
import { Blog } from "@/types/types";
import { uploadFileToR2, uploadHtmlToR2 } from "@/lib/r2/r2";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

async function getThumbnailUrl(formData: FormData) {
  const thubnailType = formData.get("thumbnailType");
  if (thubnailType === "url") {
    return formData.get("thumbnailUrl") as string;
  }
  const thumbnailUrl = await uploadFileToR2(
    formData.get("thumbnailFile") as File
  );
  return thumbnailUrl;
}

async function getContentUrl(html: string, slug: string) {
  const contentUrl = await uploadHtmlToR2(slug, html);
  return contentUrl;
}

export default async function createBlog(data: FormData) {
  const slug = generateSlug(data.get("title") as string);

  let blogData: Blog = {
    title: data.get("title") as string,
    excerpt: data.get("excerpt") as string,
    tags: (data.get("tags") as string).split(",") as string[],
    thumbnailUrl: await getThumbnailUrl(data),
    isFeatured: data.get("isFeatured") === "true",
    tableOfContents: JSON.parse(
      data.get("tableOfContents") as string
    ) as string[],
    contentUrl: await getContentUrl(data.get("html") as string, slug),
    slug,
  };

  const HTMLcontent = await fetch(blogData.contentUrl);
  const html = await HTMLcontent.text();

  const res = await prisma.blog.create({
    data: {
      title: blogData.title,
      excerpt: blogData.excerpt,
      tags: blogData.tags,
      thumbnailUrl: blogData.thumbnailUrl,
      isFeatured: blogData.isFeatured,
      tableOfContents: blogData.tableOfContents,
      contentUrl: blogData.contentUrl,
      slug: blogData.slug,
      readTime: calculateReadTime(html),
    },
  });

  if (!res?.id) {
    throw new Error("Blog creation failed");
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    status: 200,
  };
}
