"use server";
import { prisma } from "@/prisma";

export default async function getHTML(slug: string) {
  const data = await prisma.blog.findUnique({
    where: {
      slug: slug,
    },
    select: {
      contentUrl: true,
      isFeatured: true,
    },
  });

  if (!data) {
    throw new Error("Blog not found");
  }

  const HTMLcontent = await fetch(data.contentUrl);
  const html = await HTMLcontent.text();

  return {
    success: true,
    status: 200,
    data: {
      html: html,
      isFeatured: data.isFeatured,
    },
  };
}
