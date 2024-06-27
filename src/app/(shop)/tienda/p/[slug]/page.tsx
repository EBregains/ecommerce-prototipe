'use server'

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ProductDisplay } from "@/components/ProductDisplay";
import { ImageGalleryDisplay } from "@/components/ImageGalleryDisplay";
import { getProduct, getProductImages } from "@/lib/data";
import { redirect } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createClient } from "@/utils/supabase/server";


export default async function ProductPage({ params }: { params: { slug: string } }) {

  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  const producto = await getProduct('slug', params.slug)
  const images = await getProductImages(params.slug)

  if (!producto) {
    redirect('/tienda')
  }

  interface Breadcrumb {
    label: string;
    href: string;
    active?: boolean;
  }

  const breadcrumbs = [{ label: "Tienda", href: "/tienda" }, { label: "Productos", href: "/tienda/p" }]
  return (
    <section className="bg-white flex-1">
      <MaxWidthWrapper className="p-4 lg:p-6">
        <div className="flex flex-col items-center lg:items-start lg:flex-row justify-center">
          <ImageGalleryDisplay images={images} />
          <div className="w-full max-w-96">
            <div className="mb-8 mt-8 lg:mt-0">
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <ProductDisplay product={producto} user_id={user?.id} />
          </div>
        </div>
        {/* <div>
          {producto?.description}
        </div> */}
      </MaxWidthWrapper>
    </section>)
}