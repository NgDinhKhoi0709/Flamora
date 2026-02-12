import { notFound } from "next/navigation";

const posts: { slug: string; title: string; content: string }[] = [
  {
    slug: "gioi-thieu-flamora",
    title: "Giới thiệu Flamora",
    content: "Flamora là ... (nội dung mẫu).",
  },
  {
    slug: "huong-thom-va-cach-chon",
    title: "Hương thơm và cách chọn",
    content: "Hướng dẫn chọn mùi ...",
  },
];

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <article>
        <h1 className="text-3xl font-headline mb-4">{post.title}</h1>
        <div className="prose text-muted-foreground">{post.content}</div>
      </article>
    </div>
  );
}
