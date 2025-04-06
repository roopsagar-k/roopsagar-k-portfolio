"use server";
import { calculateReadTime, generateSlug } from "@/lib/utils";
import { Blog } from "@/types/types";
import {
  uploadFileToR2,
  uploadHtmlToR2,
  deleteHtmlFromR2,
  deleteImageFromR2,
} from "@/lib/r2/r2";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

function isUserUploadedImage(url: string): boolean {
  try {
    const pathname = new URL(url).pathname;
    const filename = pathname.split("/").pop();
    if (!filename) return false;

    const nameWithoutExt = filename.split(".")[0];
    return nameWithoutExt.endsWith("-uploaded");
  } catch {
    return false;
  }
}

export default async function updateBlog(data: FormData) {
  const newSlug = generateSlug(data.get("title") as string);
  const updatedHTML = data.get("html") as string;
  const thumbnailType = data.get("thumbnailType") as string;
  const thumbnailUpdate = data.get("thumbnailUpdate") as string;
  const thumbnailUrl = data.get("thumbnailUrl") as string;
  const thumbnailFile = data.get("thumbnailFile") as File;
  const isFeatured = data.get("isFeatured") === "true";
  const title = data.get("title") as string;
  const excerpt = data.get("excerpt") as string;
  const tableOfContents = JSON.parse(
    data.get("tableOfContents") as string
  ) as string[];
  const slug = data.get("slug") as string;

  await deleteHtmlFromR2(slug);
  const contentUrl = await uploadHtmlToR2(slug, updatedHTML);

  if (thumbnailUpdate === "true") {
    const data = await prisma.blog.findUnique({
      where: { slug },
      select: {
        thumbnailUrl: true,
        id: true,
      },
    });
    if (isUserUploadedImage(data?.thumbnailUrl as string)) {
      await deleteImageFromR2(data?.thumbnailUrl as string);
    }
    if (thumbnailType === "url") {
      await prisma.blog.update({
        where: { slug },
        data: {
          thumbnailUrl: thumbnailUrl,
          contentUrl: contentUrl,
          isFeatured: isFeatured,
          title: title,
          excerpt: excerpt,
          tableOfContents: tableOfContents,
          slug: newSlug,
          readTime: calculateReadTime(updatedHTML),
        },
      });
    } else {
      const thumbnailUrl = await uploadFileToR2(thumbnailFile);
      await prisma.blog.update({
        where: { slug },
        data: {
          thumbnailUrl: thumbnailUrl,
          contentUrl: contentUrl,
          isFeatured: isFeatured,
          title: title,
          excerpt: excerpt,
          tableOfContents: tableOfContents,
          slug: newSlug,
          readTime: calculateReadTime(updatedHTML),
        },
      });
    }
  } else {
    await prisma.blog.update({
      where: { slug },
      data: {
        contentUrl: contentUrl,
        isFeatured: isFeatured,
        title: title,
        excerpt: excerpt,
        tableOfContents: tableOfContents,
        slug: newSlug,
        readTime: calculateReadTime(updatedHTML),
      },
    });
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    status: 200,
    data: {
      newSlug: newSlug,
    },
  };
}
