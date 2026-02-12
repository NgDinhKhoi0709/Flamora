"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ProductColor, Scent, Category } from "@/types";

interface ProductAdvancedFiltersProps {
  categories: Category[];
  allColors: ProductColor[];
  allScents: Scent[];
  minPrice: number;
  maxPrice: number;
}

export function ProductAdvancedFilters({
  categories,
  allColors,
  allScents,
  minPrice,
  maxPrice,
}: ProductAdvancedFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helpers for query string
  const createQueryString = useCallback(
    (name: string, value: string | string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (Array.isArray(value)) {
        params.delete(name);
        value.forEach((v) => params.append(name, v));
      } else {
        params.set(name, value);
      }
      params.delete("page");
      return params.toString();
    },
    [searchParams],
  );

  // Lấy giá trị filter hiện tại từ URL
  let priceGte = Number(searchParams.get("price_gte"));
  let priceLte = Number(searchParams.get("price_lte"));
  // Nếu không hợp lệ thì reset về min/max
  if (isNaN(priceGte) || priceGte < minPrice) priceGte = minPrice;
  if (isNaN(priceLte) || priceLte > maxPrice) priceLte = maxPrice;
  if (priceGte > priceLte) priceGte = minPrice;
  // State tạm cho slider
  const [sliderValue, setSliderValue] = useState<[number, number]>([
    priceGte,
    priceLte,
  ]);
  const selectedColors = searchParams.getAll("color");
  const selectedScents = searchParams.getAll("scent");
  const selectedCategories = searchParams.getAll("cat");

  // Handler cập nhật filter
  // Chỉ cập nhật URL khi thả chuột (onValueCommit)
  const handlePriceChange = (values: number[]) => {
    // Đảm bảo luôn là mảng 2 phần tử, min < max
    if (values.length === 2) setSliderValue([values[0], values[1]]);
  };
  const handlePriceCommit = (values: number[]) => {
    // Đảm bảo luôn là mảng 2 phần tử, min < max
    let [minV, maxV] = values;
    if (minV > maxV) [minV, maxV] = [maxV, minV];
    const params = new URLSearchParams(searchParams.toString());
    params.set("price_gte", String(minV));
    params.set("price_lte", String(maxV));
    params.delete("page");
    router.push(pathname + "?" + params.toString());
  };
  const handleColorChange = (color: string) => {
    let next = [...selectedColors];
    if (next.includes(color)) next = next.filter((c) => c !== color);
    else next.push(color);
    router.push(pathname + "?" + createQueryString("color", next));
  };
  const handleScentChange = (scent: string) => {
    let next = [...selectedScents];
    if (next.includes(scent)) next = next.filter((s) => s !== scent);
    else next.push(scent);
    router.push(pathname + "?" + createQueryString("scent", next));
  };
  const handleCategoryChange = (cat: string) => {
    let next = [...selectedCategories];
    if (next.includes(cat)) next = next.filter((c) => c !== cat);
    else next.push(cat);
    router.push(pathname + "?" + createQueryString("cat", next));
  };

  // Định dạng tiền VND: 290,000₫ (dùng en-US để luôn dùng dấu phẩy, tránh chấm)
  function formatVND(val: number) {
    return val.toLocaleString("en-US") + "₫";
  }
  // Handler xóa bộ lọc (reset luôn sort)
  const handleClearFilters = () => {
    router.push(pathname + "?sort=newest");
  };

  return (
    <aside className="w-full md:w-64 pr-4 mb-8 md:mb-0">
      <div className="bg-white rounded-lg shadow p-4 space-y-6">
        {/* Giá */}
        <div>
          <h4 className="font-semibold mb-2">Khoảng giá</h4>
          <Slider
            min={minPrice}
            max={maxPrice}
            value={sliderValue}
            step={10000}
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceCommit}
            minStepsBetweenThumbs={1}
            // Radix Slider mặc định hỗ trợ 2 thumb nếu value là mảng 2 phần tử
          />
          <div className="flex justify-between text-xs mt-1">
            <span>{formatVND(priceGte)}</span>
            <span>{formatVND(maxPrice)}</span>
          </div>
        </div>
        {/* Loại */}
        <div>
          <h4 className="font-semibold mb-2">Loại sản phẩm</h4>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedCategories.includes(cat.slug)}
                  onCheckedChange={() => handleCategoryChange(cat.slug)}
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Màu sắc */}
        <div>
          <h4 className="font-semibold mb-2">Màu sắc</h4>
          <div className="flex flex-col gap-1">
            {allColors.map((color) => (
              <label key={color.name} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedColors.includes(color.name)}
                  onCheckedChange={() => handleColorChange(color.name)}
                />
                <span
                  className="w-4 h-4 rounded-full inline-block"
                  style={{ background: color.hex }}
                />
                <span>{color.name}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Mùi hương */}
        <div>
          <h4 className="font-semibold mb-2">Mùi hương</h4>
          <div className="flex flex-col gap-1">
            {allScents.map((scent) => (
              <label key={scent.id} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedScents.includes(scent.name)}
                  onCheckedChange={() => handleScentChange(scent.name)}
                />
                <span>{scent.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button variant="outline" size="sm" onClick={handleClearFilters}>
            Xóa bộ lọc
          </Button>
        </div>
      </div>
    </aside>
  );
}
