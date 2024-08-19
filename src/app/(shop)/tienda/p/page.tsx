import ArticleCard from "@/components/ArticleCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SearchBar from "@/components/SearchBar";
import { getProduct, getProducts } from "@/lib/data";

export default async function ProductsPage({ params }: { params: { slug: string } }) {

  const products = await getProducts()
  return <MaxWidthWrapper>
    <SearchBar />

    {products?.map((product, index) => {
      return (
        <ArticleCard
          key={product.id}
          imgSrc={product.images[0]}
          value={product.base_price}
          title={product.title}
          slug={product.slug}
        />
      )
    })}
  </MaxWidthWrapper>
}
