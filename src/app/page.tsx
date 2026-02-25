import { HeroSection } from "@/components/layout/HeroSection";
import { HomeContent } from "@/components/layout/HomeContent";
import { getCategories, getProducts } from "@/data/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default async function Home() {
  const categories = await getCategories();
  const products = await getProducts({ limit: 4, sort: "popularity" });

  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");
  const storyImage = PlaceHolderImages.find((img) => img.id === "story-image");

  return (
    <div className="flex flex-col">
      <HeroSection heroImage={heroImage} />
      <HomeContent
        categories={categories}
        products={products}
        storyImage={storyImage}
      />
    </div>
  );
}
