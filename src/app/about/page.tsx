import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage1 = PlaceHolderImages.find(img => img.id === 'story-image');
  const aboutImage2 = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-headline tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Câu chuyện của Flamora
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            A softer kind of light. Chúng tôi tin rằng ánh sáng không chỉ để soi rọi, mà còn để sưởi ấm tâm hồn.
          </p>
        </div>

        <div className="mt-16 lg:mt-24 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="prose prose-lg max-w-none text-foreground/80">
            <h2 className="font-headline text-3xl text-foreground">Bắt đầu từ Đam mê</h2>
            <p>
              Flamora ra đời từ tình yêu với những mùi hương tinh tế và niềm tin vào sức mạnh chữa lành của ánh sáng dịu dàng. Chúng tôi muốn tạo ra không chỉ là những ngọn nến, mà là những trải nghiệm, những khoảnh khắc bình yên và thư thái trong cuộc sống hối hả.
            </p>
            <p>
              Hành trình của chúng tôi bắt đầu trong một gian bếp nhỏ, với những mẻ sáp đầu tiên được đun chảy và pha trộn thủ công. Mỗi mùi hương là một câu chuyện, một ký ức được chúng tôi gói ghém cẩn thận.
            </p>
          </div>
          <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
            {aboutImage1 && (
              <Image
                src={aboutImage1.imageUrl}
                alt={aboutImage1.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage1.imageHint}
              />
            )}
          </div>
        </div>

        <div className="mt-16 lg:mt-24 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
           <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg md:order-last">
            {aboutImage2 && (
              <Image
                src={aboutImage2.imageUrl}
                alt={aboutImage2.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage2.imageHint}
              />
            )}
          </div>
          <div className="prose prose-lg max-w-none text-foreground/80">
            <h2 className="font-headline text-3xl text-foreground">Cam kết về Chất lượng</h2>
            <p>
              Chất lượng là ưu tiên hàng đầu tại Flamora. Chúng tôi tỉ mỉ lựa chọn những nguyên liệu bền vững và thân thiện với môi trường. Sáp nến của chúng tôi là hỗn hợp sáp cọ và sáp đậu nành tự nhiên, đảm bảo cháy sạch và an toàn cho sức khỏe.
            </p>
            <p>
              Bấc nến được làm từ sợi cotton không chì, và các loại tinh dầu hương liệu chúng tôi sử dụng đều đạt chứng nhận an toàn, không chứa phthalates. Mỗi sản phẩm đều được đổ bằng tay với sự chăm chút tối đa tại xưởng của chúng tôi ở Sài Gòn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
