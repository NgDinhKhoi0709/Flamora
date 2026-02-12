import { getProducts } from "@/data/mock-data";
import { ProductCard } from "@/components/products/product-card";

export default async function SalePage() {
  const products = await getProducts();
  const saleProducts = products.filter((p) => p.tags.includes("Ưu đãi"));

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Sale
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Các sản phẩm đang có ưu đãi đặc biệt.
        </p>
      </div>

      {saleProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {saleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium">Không có ưu đãi hiện tại</h2>
          <p className="mt-2 text-muted-foreground">
            Hãy quay lại sau để xem các chương trình khuyến mãi.
          </p>
        </div>
      )}
    </div>
  );
}
