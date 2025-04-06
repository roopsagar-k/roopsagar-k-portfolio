"use server";
import { prisma } from "@/prisma";
import { deleteHtmlFromR2, deleteImageFromR2 } from "@/lib/r2/r2";
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

export default async function deleteBlog(slug: string) {
  const data = await prisma.blog.delete({
    where: {
      slug: slug,
    },
    select: {
      thumbnailUrl: true,
      contentUrl: true,
    },
  });

  await deleteHtmlFromR2(data.contentUrl.split("/").pop()?.replace(".html", "") as string);

  if (data.thumbnailUrl) {
    if (isUserUploadedImage(data.thumbnailUrl)) {
      await deleteImageFromR2(data.thumbnailUrl);
    }
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    status: 200,
  };
}
