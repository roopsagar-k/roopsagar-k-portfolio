import BlogPost  from "@/components/blogs/BlogPost";
import { Metadata } from "next";
import { prisma } from "@/prisma";
import { cache } from "react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await prisma.blog.findMany();
  return posts.map(({ slug }) => slug).slice(0, 10);
}

const fetchBlog = cache(async (slug: string) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: slug },
    });
    return blog;
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await fetchBlog(params.slug);
  if (!data) return { title: "Blog Post Not Found" };
  const baseUrl = "https://roopsagar.tech";
  const thumbnailUrl = data.thumbnailUrl || "No blog image";
  const publishedDate = data.createdAt?.toISOString();
  const updatedDate = data.updatedAt?.toISOString();
  const postUrl = `${baseUrl}/blogs/${params.slug}`;
  return {
    title: data.title,
    description: data.excerpt,
    keywords: data.tags,
    openGraph: {
      type: "article",
      url: postUrl,
      title: data.title,
      description: data.excerpt ?? undefined,
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      siteName: "roopsagar.tech",
      publishedTime: publishedDate,
      modifiedTime: updatedDate,
    },

    twitter: {
      card: "summary_large_image",
      title: data.title,
      images: [thumbnailUrl],
      description: data.excerpt ?? undefined,
      site: "roopsagar.tech",
    },

    other: {
      "article:author": "Roopsagar K",
      "article:section": data.tags[0] || "Blog",
      "article:tag": data.tags?.join(", "),
    },
    alternates: {
      canonical: `${baseUrl}/blogs/${params.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  
  let data = await fetchBlog(params.slug);
  if (!data) return notFound();

  const HTMLcontent = await fetch(data.contentUrl);
  const html = await HTMLcontent.text();
  console.log("HTML content fetched successfully", data.tableOfContents);
  const newData = { ...data, html: html };
  return <BlogPost blog={newData!} />;
}

