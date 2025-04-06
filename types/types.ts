export interface Blog {
  title: string;
  excerpt: string;
  contentUrl: string;
  tableOfContents: string[];
  tags: string[];
  isFeatured: boolean;
  thumbnailUrl: string;
  slug: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  html?: string;
  readTime?: string;
}
