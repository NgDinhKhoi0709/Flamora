import { notFound } from "next/navigation";
import type { ReactNode } from "react";

const posts: { slug: string; title: string; content: ReactNode }[] = [
  {
    slug: "gioi-thieu-flamora",
    title: "Giới thiệu Flamora",
    content: (
      <>
        <p>
          Flamora là thương hiệu sáp thơm treo dành cho những ai yêu sự tinh tế
          và muốn một không gian luôn dễ chịu mà không cần dùng lửa hay tạo
          khói. Chỉ cần treo lên xe, tủ đồ hoặc một góc phòng, hương thơm sẽ lan
          tỏa dịu nhẹ theo cách tự nhiên.
        </p>
        <p>
          Chúng tôi lựa chọn sáp nền và tinh dầu hương liệu đạt chứng nhận an
          toàn, tối ưu để mùi hương bền, rõ tầng hương, nhưng vẫn êm ái — phù
          hợp cho nhịp sống bận rộn hằng ngày.
        </p>
      </>
    ),
  },
  {
    slug: "huong-thom-va-cach-chon",
    title: "Hương thơm và cách chọn",
    content: (
      <>
        <p>
          Chọn mùi hương giống như chọn “chất giọng” cho không gian. Với sáp
          thơm treo, bạn có thể bắt đầu từ nhu cầu: cần tỉnh táo (cam chanh,
          thảo mộc), cần thư giãn (hoa cỏ, trà), hay cần ấm áp (gỗ, hổ phách).
        </p>
        <p>
          Mẹo nhỏ: không gian kín (tủ đồ, phòng nhỏ) hợp mùi nhẹ và sạch; không
          gian rộng hơn có thể chọn mùi có tầng hương rõ hơn. Nếu dùng cho xe,
          ưu tiên mùi tươi mát để cảm giác dễ chịu khi di chuyển.
        </p>
      </>
    ),
  },
  {
    slug: "nen-thom-va-thien",
    title: "Sáp thơm và Thiền định",
    content: (
      <>
        <p>
          Thiền định không nhất thiết phải cầu kỳ — đôi khi chỉ cần một mùi
          hương quen thuộc để “báo hiệu” cho não bộ rằng đã đến lúc chậm lại.
          Sáp thơm (treo/đặt) là lựa chọn gọn gàng: không cần dùng lửa, không
          cần canh chừng, chỉ cần đặt đúng chỗ để hương lan tỏa nhẹ nhàng.
        </p>
        <p>
          Bạn có thể chọn nhóm mùi thanh (trà trắng, lavender) cho buổi tối,
          hoặc nhóm mùi gỗ ấm (cedar, sandalwood) cho buổi sáng tĩnh lặng. Giữ
          mùi hương nhất quán theo một “nghi thức” nhỏ sẽ giúp bạn dễ vào trạng
          thái tập trung hơn.
        </p>
      </>
    ),
  },
];

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
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
