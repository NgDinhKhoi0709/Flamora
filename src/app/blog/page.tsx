import Link from "next/link";

const posts = [
  {
    slug: "gioi-thieu-flamora",
    title: "Giới thiệu Flamora",
    excerpt: "Câu chuyện và sứ mệnh phía sau thương hiệu.",
  },
  {
    slug: "huong-thom-va-cach-chon",
    title: "Hương thơm và cách chọn",
    excerpt: "Hướng dẫn chọn mùi phù hợp với không gian của bạn.",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Blog
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Cập nhật tin tức, hướng dẫn và câu chuyện từ Flamora.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="border rounded-lg p-6">
            <h2 className="text-2xl font-medium mb-2">{post.title}</h2>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-sm text-primary">
              Đọc thêm →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
