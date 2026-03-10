import fs from "fs";
import path from "path";
import { Category, Product, Scent, SortOption } from "@/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BASE_SCENTS } from "@/lib/constants";

const findImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id)?.imageUrl ||
  "https://picsum.photos/seed/placeholder/800/800";

// ─── Lấy ảnh từ thư mục public/sap_thom/ ────────────────────────────────────
const getImagesFromFolder = (folderName: string): string[] => {
  try {
    const dirPath = path.join(process.cwd(), "public", "sap_thom", folderName);
    if (!fs.existsSync(dirPath)) return [];
    
    const files = fs.readdirSync(dirPath);
    const images = files.filter(file => /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file));
    
    // Convert to URL paths
    return images.map(file => `/sap_thom/${folderName}/${file}`);
  } catch (error) {
    console.error(`Error reading directory public/sap_thom/${folderName}:`, error);
    return [];
  }
};

// ─── Categories ───────────────────────────────────────────────────────────────
const categoriesBase = [
  {
    id: "cat1",
    name: "Sáp Treo Xe",
    slug: "sap-treo-xe",
    description:
      "Mang hương thơm yêu thích theo bạn trên mọi nẻo đường với những miếng sáp treo xe tinh tế.",
    _folder: "oto",
    _fallback: "category-car-freshener",
  },
  {
    id: "cat2",
    name: "Sáp Treo Phòng",
    slug: "sap-treo-phong",
    description:
      "Khuếch tán hương thơm tự nhiên cho không gian sống, phòng ngủ và phòng làm việc của bạn.",
    _folder: "phong_ngu",
    _fallback: "category-jar",
  },
  {
    id: "cat3",
    name: "Sáp Treo Tủ",
    slug: "sap-treo-tu",
    description:
      "Giữ quần áo và tủ đồ luôn thơm mát với những sáp treo tủ chất lượng cao.",
    _folder: "tu",
    _fallback: "category-mini-jar",
  },
  {
    id: "cat4",
    name: "Set Quà Tặng",
    slug: "set-qua-tang",
    description:
      "Các bộ quà tặng hoàn hảo, được đóng gói tinh tế cho mọi dịp đặc biệt.",
    _folder: "set4",
    _fallback: "category-gift-accessory",
  },
];

// Helper to add IDs to the base scents
const makeScents = (prefix: string): Scent[] => BASE_SCENTS.map((item, index) => ({
  id: `${prefix}-s${index + 1}`,
  ...item
}));

// ─── Products ─────────────────────────────────────────────────────────────────
const productsBase = [
  // ── Sáp Treo Xe ──────────────────────────────────────────────────────────────
  {
    id: "prod-xe",
    name: "Sáp Thơm Treo Xe Flamora",
    slug: "sap-thom-treo-xe",
    category: "sap-treo-xe",
    shortDescription: "Mang hương thơm yêu thích theo bạn trên mọi nẻo đường.",
    description:
      "Sáp thơm treo xe Flamora được làm từ sáp tự nhiên 100%, kết hợp với hoa khô và tinh dầu nguyên chất. Hương thơm kéo dài 30–45 ngày, giúp không gian trong xe luôn dễ chịu và thư thái. Có 6 mùi hương để lựa chọn.",
    usageInstructions:
      "Treo trên gương chiếu hậu hoặc thông gió trong xe. Tránh tiếp xúc trực tiếp với ánh nắng mặt trời. Thay mới sau 30–45 ngày.",
    shippingReturns:
      "Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.",
    _folder: "oto",
    _fallbacks: ["product-9-1", "product-1-1"],
    tags: ["Bán chạy"],
    createdAt: "2024-01-01T10:00:00Z",
    popularityScore: 95,
    scents: makeScents("xe"),
  },

  // ── Sáp Treo Phòng ───────────────────────────────────────────────────────────
  {
    id: "prod-phong",
    name: "Sáp Thơm Treo Phòng Flamora",
    slug: "sap-thom-treo-phong",
    category: "sap-treo-phong",
    shortDescription: "Không gian sống thơm mát, dễ chịu suốt cả ngày.",
    description:
      "Sáp thơm treo phòng Flamora với hoa khô tự nhiên trang trí tinh tế, phù hợp đặt trong phòng ngủ, phòng khách và góc làm việc. Hương thơm lan tỏa nhẹ nhàng trong không gian, kéo dài 30–60 ngày. Có 6 mùi hương để lựa chọn.",
    usageInstructions:
      "Treo tại vị trí thoáng khí trong phòng, cách xa nguồn nhiệt và ánh nắng trực tiếp. Thay mới sau 30–60 ngày tùy độ thông thoáng.",
    shippingReturns:
      "Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.",
    _folder: "phong_ngu",
    _fallbacks: ["product-4-1", "product-5-1"],
    tags: ["Mới", "Bán chạy"],
    createdAt: "2024-02-01T10:00:00Z",
    popularityScore: 92,
    scents: makeScents("phong"),
  },

  // ── Sáp Treo Tủ ──────────────────────────────────────────────────────────────
  {
    id: "prod-tu",
    name: "Sáp Thơm Treo Tủ Flamora",
    slug: "sap-thom-treo-tu",
    category: "sap-treo-tu",
    shortDescription: "Giữ quần áo và tủ đồ luôn thơm mát, tươi mới.",
    description:
      "Sáp thơm treo tủ Flamora giúp ngăn mùi ẩm, bảo vệ quần áo và mang lại hương thơm dễ chịu cho tủ đồ. Thiết kế nhỏ gọn, tiện lợi, hương thơm kéo dài 60–90 ngày. Có 6 mùi hương để lựa chọn.",
    usageInstructions:
      "Treo bên trong tủ quần áo hoặc ngăn kéo. Không để tiếp xúc trực tiếp với vải. Thay mới sau 60–90 ngày.",
    shippingReturns:
      "Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.",
    _folder: "tu",
    _fallbacks: ["product-6-1", "product-7-1"],
    tags: [],
    createdAt: "2024-03-01T10:00:00Z",
    popularityScore: 88,
    scents: makeScents("tu"),
  },

  // ── Set Quà Tặng ─────────────────────────────────────────────────────────────
  {
    id: "prod-set-4",
    name: 'Set 4 Sáp Thơm Quà Tặng',
    slug: "set-4-sap-thom",
    category: "set-qua-tang",
    shortDescription: "Bộ 4 sáp thơm tiết kiệm, phù hợp làm quà tặng.",
    description:
      "Bộ quà tặng bao gồm 4 sáp thơm Flamora (có thể mix tùy ý giữa các dòng treo xe, treo phòng, treo tủ). Bạn có thể tự chọn mùi hương yêu thích, hoặc để Flamora chọn ngẫu nhiên những mùi hương best-seller cho bạn.",
    usageInstructions: "Thông tin chi tiết trên từng sản phẩm trong bộ.",
    shippingReturns:
      "Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày.",
    _folder: "set4",
    _fallbacks: ["product-14-1", "product-12-1"],
    tags: ["Quà tặng", "Bán chạy", "Ưu đãi"],
    createdAt: "2024-04-01T10:00:00Z",
    popularityScore: 99,
    scents: [
      {
        id: "set-4-s1",
        name: "Tự chọn 4 mùi hương",
        price: 199000,
        notes: { top: "", mid: "", base: "" },
        descriptionShort: "4 sáp thơm, bạn chọn mùi",
      },
      {
        id: "set-4-s2",
        name: "Ngẫu nhiên 4 mùi hương",
        price: 199000,
        notes: { top: "", mid: "", base: "" },
        descriptionShort: "4 sáp thơm, Flamora chọn ngẫu nhiên",
      },
    ],
  },
];

// ─── Live Builders ────────────────────────────────────────────────────────────
// Build fresh on each API call so it hot-reloads dynamically
const buildCategories = (): Category[] => {
  return categoriesBase.map(c => {
    const { _folder, _fallback, ...rest } = c;
    const dynamicImages = getImagesFromFolder(_folder);
    return {
      ...rest,
      image: dynamicImages.length > 0 ? dynamicImages[0] : findImage(_fallback)
    };
  });
};

const buildProducts = (): Product[] => {
  return productsBase.map(p => {
    const { _folder, _fallbacks, ...rest } = p;
    const dynamicImages = getImagesFromFolder(_folder);
    return {
      ...rest,
      images: dynamicImages.length > 0 ? dynamicImages : _fallbacks.map(findImage)
    };
  });
};

// ─── Exported API functions ───────────────────────────────────────────────────
export const getCategories = async (): Promise<Category[]> => {
  return buildCategories();
};

export const getCategoryBySlug = async (
  slug: string,
): Promise<Category | undefined> => {
  return buildCategories().find((c) => c.slug === slug);
};

interface GetProductsParams {
  category?: string;
  sort?: SortOption;
  limit?: number;
  query?: string;
}

export const getProducts = async (
  params: GetProductsParams = {},
): Promise<Product[]> => {
  let filteredProducts = buildProducts();

  if (params.category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === params.category,
    );
  }

  if (params.query) {
    const lowercasedQuery = params.query.toLowerCase();
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(lowercasedQuery),
    );
  }

  if (params.sort) {
    switch (params.sort) {
      case "newest":
        filteredProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "price-asc":
        filteredProducts.sort(
          (a, b) =>
            Math.min(...a.scents.map((s) => s.price)) -
            Math.min(...b.scents.map((s) => s.price)),
        );
        break;
      case "price-desc":
        filteredProducts.sort(
          (a, b) =>
            Math.max(...b.scents.map((s) => s.price)) -
            Math.max(...a.scents.map((s) => s.price)),
        );
        break;
      case "popularity":
        filteredProducts.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
    }
  }

  if (params.limit) {
    return filteredProducts.slice(0, params.limit);
  }

  return filteredProducts;
};

export const getProductBySlug = async (
  slug: string,
): Promise<Product | undefined> => {
  return buildProducts().find((p) => p.slug === slug);
};

export const getRelatedProducts = async (
  currentProduct: Product,
): Promise<Product[]> => {
  const related = buildProducts().filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id,
  );
  return related.slice(0, 4);
};
