"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import type { Category, SortOption } from "@/types";

interface ProductFiltersProps {
  categories: Category[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "all";
  const activeSort = searchParams.get("sort") || "newest";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      if (name === "category" && value === "all") {
        params.delete("category");
      }
      params.delete("page"); // Reset to first page on filter/sort change
      return params.toString();
    },
    [searchParams],
  );

  const handleCategoryChange = (slug: string) => {
    router.push(pathname + "?" + createQueryString("category", slug));
  };

  const handleSortChange = (value: SortOption) => {
    router.push(pathname + "?" + createQueryString("sort", value));
  };

  return (
    <div className="mb-8">
      <div className="flex justify-end">
        <Select
          onValueChange={(v) => handleSortChange(v as SortOption)}
          value={activeSort}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Mới nhất</SelectItem>
            <SelectItem value="popularity">Bán chạy nhất</SelectItem>
            <SelectItem value="price-asc">Giá: Thấp đến Cao</SelectItem>
            <SelectItem value="price-desc">Giá: Cao đến Thấp</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
