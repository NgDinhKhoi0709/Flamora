import { getProducts } from "@/data/mock-data";
import { SalePageContent } from "@/components/layout/SalePageContent";

export default async function SalePage() {
  const products = await getProducts();
  const saleProducts = products.filter((p) => p.tags.includes("Ưu đãi"));

  return <SalePageContent saleProducts={saleProducts} />;
}
