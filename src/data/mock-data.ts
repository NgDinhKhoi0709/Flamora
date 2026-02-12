import { Category, Product, Scent, ProductColor, SortOption } from "@/types";
import { slugify } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || 'https://picsum.photos/seed/placeholder/800/800';

const categories: Category[] = [
  { id: 'cat1', name: 'Nến Ly Mini', slug: 'nen-ly-mini', description: 'Những hũ nến nhỏ xinh, phù hợp để khám phá mùi hương mới hoặc làm quà tặng.', image: findImage('category-mini-jar') },
  { id: 'cat2', name: 'Nến Hũ Tròn', slug: 'nen-hu-tron', description: 'Dòng sản phẩm chủ đạo với hũ gốm sứ tinh tế và thời gian cháy lâu, mang hương thơm lan tỏa khắp không gian.', image: findImage('category-round-jar') },
  { id: 'cat3', name: 'Sáp Thơm Treo Xe', slug: 'sap-thom-treo-xe', description: 'Mang hương thơm yêu thích theo bạn trên mọi nẻo đường.', image: findImage('category-car-freshener') },
  { id: 'cat4', name: 'Phụ Kiện & Quà Tặng', slug: 'phu-kien-qua-tang', description: 'Những dụng cụ cần thiết để chăm sóc nến và các bộ quà tặng được thiết kế đặc biệt.', image: findImage('category-accessories') },
];

const products: Product[] = [
  // Nến Ly Mini
  {
    id: 'prod1', name: 'Nến Thơm "First Light"', slug: 'nen-thom-first-light', category: 'nen-ly-mini',
    shortDescription: 'Sự khởi đầu tươi mới và tinh khôi.',
    description: 'Hương thơm "First Light" như những tia nắng đầu tiên của ngày mới, trong trẻo và đầy năng lượng. Sự kết hợp của cam bergamot và hoa nhài trắng tạo nên một không gian tươi mát, đánh thức mọi giác quan.',
    usageInstructions: 'Trong lần đốt đầu tiên, hãy để sáp chảy đều khắp bề mặt (khoảng 1-2 giờ). Cắt bấc còn 0.5cm trước mỗi lần đốt. Không đốt quá 4 giờ.',
    shippingReturns: 'Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.',
    images: [findImage('product-1-1'), findImage('product-1-2')],
    tags: ['Mới', 'Bán chạy'], createdAt: '2024-05-01T10:00:00Z', popularityScore: 95,
    scents: [
      { id: 's1', name: 'First Light', price: 250000, notes: { top: 'Cam Bergamot, Chanh Vàng', mid: 'Hoa Nhài Trắng, Hoa Linh Lan', base: 'Xạ Hương Trắng' }, descriptionShort: 'Tươi mát, trong trẻo' }
    ],
    colors: [
      { name: 'Trắng Ngà', hex: '#F5F4F0' }
    ]
  },
  {
    id: 'prod2', name: 'Nến Thơm "Sunday Morning"', slug: 'nen-thom-sunday-morning', category: 'nen-ly-mini',
    shortDescription: 'Cảm giác thư thái của một buổi sáng Chủ Nhật.',
    description: 'Tận hưởng sự bình yên và thư giãn tuyệt đối với "Sunday Morning". Mùi hương của vải lanh sạch, hoa oải hương và một chút cúc la mã sẽ đưa bạn đến cảm giác của một buổi sáng cuối tuần không vướng bận.',
    usageInstructions: 'Trong lần đốt đầu tiên, hãy để sáp chảy đều khắp bề mặt (khoảng 1-2 giờ). Cắt bấc còn 0.5cm trước mỗi lần đốt. Không đốt quá 4 giờ.',
    shippingReturns: 'Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.',
    images: [findImage('product-2-1')],
    tags: ['Bán chạy'], createdAt: '2024-04-15T10:00:00Z', popularityScore: 92,
    scents: [
      { id: 's2', name: 'Sunday Morning', price: 250000, notes: { top: 'Vải Lanh Sạch', mid: 'Hoa Oải Hương, Cúc La Mã', base: 'Gỗ Tuyết Tùng' }, descriptionShort: 'Sạch sẽ, thư giãn' }
    ],
    colors: [
      { name: 'Trắng Ngà', hex: '#F5F4F0' }
    ]
  },
  {
    id: 'prod3', name: 'Nến Thơm "Golden Hour"', slug: 'nen-thom-golden-hour', category: 'nen-ly-mini',
    shortDescription: 'Khoảnh khắc hoàng hôn vàng rực.',
    description: 'Ấm áp và quyến rũ, "Golden Hour" là sự hòa quyện của hổ phách, gỗ đàn hương và một chút hương hoa cam. Mùi hương này như một cái ôm ấm áp, hoàn hảo cho những buổi tối lãng mạn.',
    usageInstructions: 'Trong lần đốt đầu tiên, hãy để sáp chảy đều khắp bề mặt (khoảng 1-2 giờ). Cắt bấc còn 0.5cm trước mỗi lần đốt. Không đốt quá 4 giờ.',
    shippingReturns: 'Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.',
    images: [findImage('product-3-1')],
    tags: [], createdAt: '2024-03-20T10:00:00Z', popularityScore: 88,
    scents: [
      { id: 's3', name: 'Golden Hour', price: 270000, notes: { top: 'Hoa Cam', mid: 'Hổ Phách, Nhựa Thơm', base: 'Gỗ Đàn Hương, Vanilla' }, descriptionShort: 'Ấm áp, quyến rũ' }
    ],
    colors: [
      { name: 'Trắng Ngà', hex: '#F5F4F0' }
    ]
  },
  // Nến Hũ Tròn
  {
    id: 'prod4', name: 'Nến Hũ Gốm "Hanoi 1990"', slug: 'nen-hu-gom-hanoi-1990', category: 'nen-hu-tron',
    shortDescription: 'Ký ức Hà Nội xưa trong từng nốt hương.',
    description: 'Một mùi hương hoài niệm, lấy cảm hứng từ không khí Hà Nội những năm 90. Hương gỗ sưa trầm ấm, hoa ngọc lan thoang thoảng và một chút mùi mưa bụi đặc trưng tạo nên một tầng hương sâu lắng và đầy cảm xúc.',
    usageInstructions: 'Trong lần đốt đầu tiên, hãy để sáp chảy đều khắp bề mặt (khoảng 2-3 giờ). Cắt bấc còn 0.5cm trước mỗi lần đốt. Không đốt quá 4 giờ.',
    shippingReturns: 'Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.',
    images: [findImage('product-4-1')],
    tags: ['Bán chạy', 'Quà tặng'], createdAt: '2024-05-10T10:00:00Z', popularityScore: 98,
    scents: [
      { id: 's4', name: 'Hanoi 1990', price: 550000, notes: { top: 'Hương Mưa Bụi', mid: 'Hoa Ngọc Lan, Hoa Sữa', base: 'Gỗ Sưa, Hoắc Hương' }, descriptionShort: 'Trầm ấm, hoài niệm' }
    ],
    colors: [
      { name: 'Gốm Nâu', hex: '#8B6B5C' },
      { name: 'Gốm Kem', hex: '#EAE0D5' }
    ]
  },
  {
    id: 'prod5', name: 'Nến Hũ Gốm "Kyoto Garden"', slug: 'nen-hu-gom-kyoto-garden', category: 'nen-hu-tron',
    shortDescription: 'Khu vườn Nhật Bản tĩnh tại và an yên.',
    description: 'Thanh khiết và tĩnh tại, "Kyoto Garden" là sự kết hợp tinh tế của trà xanh matcha, tre non và hoa anh đào. Một mùi hương giúp thanh lọc tâm trí, mang lại cảm giác bình yên như đang dạo bước trong một khu vườn Nhật Bản.',
    usageInstructions: 'Trong lần đốt đầu tiên, hãy để sáp chảy đều khắp bề mặt (khoảng 2-3 giờ). Cắt bấc còn 0.5cm trước mỗi lần đốt. Không đốt quá 4 giờ.',
    shippingReturns: 'Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.',
    images: [findImage('product-5-1')],
    tags: ['Mới'], createdAt: '2024-05-20T10:00:00Z', popularityScore: 90,
    scents: [
      { id: 's5', name: 'Kyoto Garden', price: 520000, notes: { top: 'Tre Non', mid: 'Trà Xanh Matcha, Hoa Anh Đào', base: 'Gỗ Hinoki' }, descriptionShort: 'Thanh khiết, tĩnh tại' }
    ],
    colors: [
      { name: 'Gốm Xanh Matcha', hex: '#A3B899' },
      { name: 'Gốm Kem', hex: '#EAE0D5' }
    ]
  },
  {
    id: 'prod6', name: 'Nến Hũ Gốm "Wild Cabin"', slug: 'nen-hu-gom-wild-cabin', category: 'nen-hu-tron',
    shortDescription: 'Hơi ấm của căn nhà gỗ giữa rừng thông.',
    description: '"Wild Cabin" mang đến không khí ấm cúng của một căn nhà gỗ giữa rừng sâu. Hương thơm của gỗ thông, da thuộc, khói và một chút gia vị quế hồi tạo nên một mùi hương nam tính, mạnh mẽ và đầy cuốn hút.',
    usageInstructions: 'Trong lần đốt đầu tiên, hãy để sáp chảy đều khắp bề mặt (khoảng 2-3 giờ). Cắt bấc còn 0.5cm trước mỗi lần đốt. Không đốt quá 4 giờ.',
    shippingReturns: 'Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.',
    images: [findImage('product-6-1')],
    tags: [], createdAt: '2024-02-10T10:00:00Z', popularityScore: 85,
    scents: [
      { id: 's6', name: 'Wild Cabin', price: 580000, notes: { top: 'Lá Thông, Tiêu Đen', mid: 'Da Thuộc, Quế, Hồi', base: 'Gỗ Tuyết Tùng, Khói' }, descriptionShort: 'Mạnh mẽ, ấm cúng' }
    ],
    colors: [
      { name: 'Gốm Đen', hex: '#333333' },
      { name: 'Gốm Nâu', hex: '#8B6B5C' }
    ]
  },
  {
    id: 'prod7', name: 'Nến Hũ Gốm "Lofi Chill"', slug: 'nen-hu-gom-lofi-chill', category: 'nen-hu-tron',
    shortDescription: 'Giai điệu thư giãn cho một ngày mưa.',
    description: 'Hoàn hảo cho những ngày mưa lười biếng, "Lofi Chill" là sự kết hợp của hương mưa, giấy cũ và cà phê đen. Một mùi hương độc đáo, giúp bạn tập trung làm việc hoặc đơn giản là cuộn mình trong chăn ấm.',
    usageInstructions: 'Trong lần đốt đầu tiên, hãy để sáp chảy đều khắp bề mặt (khoảng 2-3 giờ). Cắt bấc còn 0.5cm trước mỗi lần đốt. Không đốt quá 4 giờ.',
    shippingReturns: 'Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.',
    images: [findImage('product-7-1')],
    tags: ['Bán chạy'], createdAt: '2024-01-15T10:00:00Z', popularityScore: 93,
    scents: [
        { id: 's7a', name: 'Lofi Chill - Coffee', price: 560000, notes: { top: 'Hương Mưa, Không Khí', mid: 'Giấy Cũ, Cà Phê Rang', base: 'Gỗ Sồi, Rêu' }, descriptionShort: 'Thư giãn, độc đáo' },
        { id: 's7b', name: 'Lofi Chill - Tea', price: 540000, notes: { top: 'Hương Mưa, Cam Bergamot', mid: 'Giấy Cũ, Trà Earl Grey', base: 'Gỗ Sồi, Rêu' }, descriptionShort: 'Thư thái, nhẹ nhàng' }
    ],
    colors: [
      { name: 'Gốm Xám', hex: '#A9A9A9' },
      { name: 'Gốm Kem', hex: '#EAE0D5' }
    ]
  },
  
  // Sáp thơm
  {
    id: 'prod9', name: 'Sáp Thơm "Road Trip"', slug: 'sap-thom-road-trip', category: 'sap-thom-treo-xe',
    shortDescription: 'Hương thơm sảng khoái cho mọi chuyến đi.',
    description: 'Sự kết hợp của bạc hà, chanh và hương biển mang lại cảm giác sảng khoái, tỉnh táo, biến mỗi chuyến đi thành một hành trình thú vị.',
    usageInstructions: 'Treo trong xe, tủ quần áo, hoặc không gian nhỏ. Tránh tiếp xúc trực tiếp với ánh nắng mặt trời.',
    shippingReturns: 'Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.',
    images: [findImage('product-9-1')],
    tags: ['Bán chạy'], createdAt: '2023-12-01T10:00:00Z', popularityScore: 91,
    scents: [
        { id: 's9', name: 'Road Trip', price: 180000, notes: { top: 'Bạc Hà, Chanh', mid: 'Hương Biển, Oải Hương', base: 'Gỗ Thông' }, descriptionShort: 'Sảng khoái, mát mẻ' }
    ],
    colors: [ { name: 'Xanh Bạc Hà', hex: '#BEE3DB' } ]
  },
  {
    id: 'prod10', name: 'Sáp Thơm "Bookstore"', slug: 'sap-thom-bookstore', category: 'sap-thom-treo-xe',
    shortDescription: 'Mùi hương của tiệm sách cũ.',
    description: 'Hương thơm ấm áp từ gỗ, vani và da thuộc, gợi nhớ về không gian yên tĩnh của một hiệu sách cũ, nơi bạn có thể đắm mình vào những trang sách.',
    usageInstructions: 'Treo trong xe, tủ quần áo, hoặc không gian nhỏ. Tránh tiếp xúc trực tiếp với ánh nắng mặt trời.',
    shippingReturns: 'Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.',
    images: [findImage('product-10-1')],
    tags: [], createdAt: '2024-04-01T10:00:00Z', popularityScore: 87,
    scents: [
        { id: 's10', name: 'Bookstore', price: 190000, notes: { top: 'Giấy Mới', mid: 'Da Thuộc, Gỗ Tuyết Tùng', base: 'Vani, Hổ Phách' }, descriptionShort: 'Ấm áp, trí thức' }
    ],
    colors: [ { name: 'Nâu Da Bò', hex: '#D2B48C' } ]
  },

  // Phụ kiện
  {
    id: 'prod12', name: 'Dụng Cụ Cắt Bấc Nến', slug: 'dung-cu-cat-bac-nen', category: 'phu-kien-qua-tang',
    shortDescription: 'Giữ cho ngọn nến của bạn luôn hoàn hảo.',
    description: 'Dụng cụ cắt bấc chuyên dụng giúp bạn dễ dàng cắt bấc nến đến độ dài lý tưởng (0.5cm), đảm bảo nến cháy sạch, đều và an toàn.',
    usageInstructions: 'Sử dụng trước mỗi lần đốt nến. Đặt phần đáy của dụng cụ lên bề mặt sáp và cắt.',
    shippingReturns: 'Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.',
    images: [findImage('product-12-1')],
    tags: ['Quà tặng'], createdAt: '2023-11-01T10:00:00Z', popularityScore: 80,
    scents: [
        { id: 's12', name: 'Tiêu chuẩn', price: 150000, notes: { top: '', mid: '', base: '' }, descriptionShort: '' }
    ],
    colors: [
        { name: 'Đen Mờ', hex: '#333333' },
        { name: 'Vàng Đồng', hex: '#DAA520' }
    ]
  },
  {
    id: 'prod13', name: 'Bộ Quà Tặng "Discovery Set"', slug: 'bo-qua-tang-discovery-set', category: 'phu-kien-qua-tang',
    shortDescription: 'Khám phá 3 mùi hương best-seller.',
    description: 'Bộ quà tặng bao gồm 3 nến ly mini với các mùi hương bán chạy nhất: First Light, Sunday Morning và Hanoi 1990. Món quà hoàn hảo để giới thiệu Flamora đến người thân yêu.',
    usageInstructions: 'Thông tin chi tiết trên từng sản phẩm.',
    shippingReturns: 'Giao hàng trong 2-5 ngày. Đổi trả miễn phí trong 7 ngày nếu có lỗi từ nhà sản xuất.',
    images: [findImage('product-14-1')],
    tags: ['Quà tặng', 'Bán chạy', 'Ưu đãi'], createdAt: '2024-05-05T10:00:00Z', popularityScore: 99,
    scents: [
        { id: 's13', name: 'Bộ 3 mùi hương', price: 690000, notes: { top: '', mid: '', base: '' }, descriptionShort: '' }
    ],
    colors: [ { name: 'Nhiều màu', hex: '#FFFFFF' } ]
  },
];

export const getCategories = async (): Promise<Category[]> => {
  return categories;
};

export const getCategoryBySlug = async (slug: string): Promise<Category | undefined> => {
  return categories.find(c => c.slug === slug);
};

interface GetProductsParams {
  category?: string;
  sort?: SortOption;
  limit?: number;
  query?: string;
}

export const getProducts = async (params: GetProductsParams = {}): Promise<Product[]> => {
  let filteredProducts = [...products];

  if (params.category) {
    filteredProducts = filteredProducts.filter(p => p.category === params.category);
  }

  if (params.query) {
    const lowercasedQuery = params.query.toLowerCase();
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(lowercasedQuery));
  }

  if (params.sort) {
    switch (params.sort) {
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-asc':
        filteredProducts.sort((a, b) => Math.min(...a.scents.map(s => s.price)) - Math.min(...b.scents.map(s => s.price)));
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => Math.max(...b.scents.map(s => s.price)) - Math.max(...a.scents.map(s => s.price)));
        break;
      case 'popularity':
        filteredProducts.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
    }
  }

  if (params.limit) {
    return filteredProducts.slice(0, params.limit);
  }

  return filteredProducts;
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  return products.find(p => p.slug === slug);
};

export const getRelatedProducts = async (currentProduct: Product): Promise<Product[]> => {
    const related = products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id);
    return related.slice(0, 4);
}
