'use client'

import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useState } from "react";
import ArticleCard from "./ArticleCard";
import { cn } from "@/utils/utils";
import { Product } from "@/lib/types";


const ProductsCarrousel = ({
  className,
  products,
  itemsPerPage
}: {
  className?: string,
  products: Array<Product> | undefined,
  itemsPerPage: number,
}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const numberOfPages = 3;

  return (
    <div className={cn("w-full h-max my-4 flex gap-x-2 items-center", className)}>
      <div className="h-full w-10 flex items-center justify-center">
        {currentPage > 1 &&
          <button type="button" onClick={() => setCurrentPage((prev) => prev - 1)}><ArrowLeftCircle className="stroke-white sm:size-8 lg:size-10 stroke-1 hover:opacity-80" /></button>
        }
      </div>
      <div className=" w-fit grid grid-cols-5 place-items-center gap-x-4 mx-auto h-72">
        {products?.map((product, index) => {
          if (index < itemsPerPage * currentPage && index >= itemsPerPage * (currentPage - 1)) {
            return (
              <ArticleCard
                key={product.id}
                imgSrc={product.images[0]}
                value={product.base_price}
                title={product.title}
                slug={product.slug}
              />
            )
          }
        })}
      </div>
      <div className="h-full w-10 flex items-center justify-center">
        {currentPage < numberOfPages &&
          <button type="button" onClick={() => setCurrentPage((prev) => prev + 1)}><ArrowRightCircle className="stroke-white sm:size-8 lg:size-10 stroke-1 hover:opacity-80" /></button>
        }
      </div>
    </div>
  )
}


export default ProductsCarrousel