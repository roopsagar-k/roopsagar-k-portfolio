import { PutObjectCommand } from "@aws-sdk/client-s3";
import r2Client from "./r2Client";

export async function uploadFileToR2(file: File): Promise<string> {
  if (!file) {
    throw new Error("No file provided or invalid file type");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uuid = crypto.randomUUID();
  const timestamp = Date.now();
  const fileExtension = file.name.split(".").pop();
  const uniqueFileName = `${uuid}-${timestamp}.${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_IMAGE_BUCKET,
    Key: uniqueFileName,
    Body: buffer,
  });

  await r2Client.send(command);

  return `${process.env.R2_IMAGE_BUCKET_URL}/${uniqueFileName}`;
}

export async function uploadHtmlToR2(slug: string, htmlContent: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BLOG_CONTENT_BUCKET,
    Key: `${slug}.html`,
    Body: htmlContent,
    ContentType: "text/html",
  });

  await r2Client.send(command);
  return `${process.env.R2_BLOG_CONTENT_BUCKET_URL}/${slug}.html`;
}
