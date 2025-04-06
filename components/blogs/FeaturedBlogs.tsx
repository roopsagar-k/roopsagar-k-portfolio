import { Blog } from "@/types/types";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { calculateReadTime } from "@/lib/utils";

const FeaturedBlogs = ({ featuredBlogs }: { featuredBlogs: Blog[] }) => {
  if (featuredBlogs.length === 0) {
    return <p>No featured blogs available</p>;
  }

  const cards = featuredBlogs.map((card, index) => (
    <Card
      key={card.thumbnailUrl}
      card={{
        excerpt: card.excerpt,
        title: card.title,
        content: card.tableOfContents,
        src: card.thumbnailUrl,
        createdAt: card.createdAt!,
        slug: card.slug,
        readTime: card.readTime!,
      }}
      layout={true}
      index={index}
    />
  ));

  return (
    <div className="w-full h-full pt-6">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Featured Blogs
      </h2>
      <Carousel items={cards} />
    </div>
  );
};

export default FeaturedBlogs;
