import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import ProductsCarrousel from "@/components/ProductsCarrousel"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/lib/Icons"
import { routes } from "@/lib/routes"
import { ArrowDownWideNarrow, ArrowRight, Baby, BriefcaseBusiness, CalendarDays, Drill, Flower2, Gamepad2, PersonStanding, ScanFace, Tags } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"

import { getBestSellers } from "@/lib/data"
import { Product } from "@/lib/types"

const Tienda = async () => {

  // TODO: Make categories from server
  const products: Product[] | undefined = await getBestSellers();

  return (
    <>
      {/* Heading and Title Section */}
      <section className="bg-white">
        <MaxWidthWrapper className="pt-8 pb-12 ">
          {/* Title and paragraph */}
          <div className="w-full px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center flex flex-col items-center">
              <h1 className="relative w-fit tracking-tight text-balance font-bold !leading-tight text-gray-900 text-4xl md:text-5xl lg:text-6xl">Bienvenido</h1>
              <p className="relative w-fit tracking-tight text-balance mt-4 font-semibold !leading-tight text-gray-900 text-xl md:text-2xl lg:text-3xl">
                Navegá y encontrá
                <span className="relative px-2">
                  <Icons.underline className='block pointer-events-none absolute inset-x-0 -bottom-6 text-sky-500' />
                  eso que querés!
                </span>
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Best Sellers Section */}
      <section className="bg-gradient-to-br from-sky-700/90 to-sky-700 relative">
        {/* Fade on top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-4 " />
        <MaxWidthWrapper className="py-8">
          <h2 className="relative w-fit tracking-tight text-balance my-4 font-medium !leading-tight text-white text-xl md:text-2xl lg:text-3xl">
            <Tags className="inline-block size-10 mr-4 stroke-gray-200" />
            Lo Mas Vendido
          </h2>
          {/* THIS IS ABSOLUTELY HORRIBLE BUT FASCINATING, HAVE TO SOLVE IT WITH SOME REACT AND BETTER IMPLEMENTATION */}
          <div className="hidden xl:block">
            <ProductsCarrousel products={products} itemsPerPage={5}></ProductsCarrousel>
          </div>
          <div className="hidden md:block xl:hidden">
            <ProductsCarrousel products={products} itemsPerPage={3}></ProductsCarrousel>
          </div>
          <div className="hidden sm:block md:hidden">
            <ProductsCarrousel products={products} itemsPerPage={2}></ProductsCarrousel>
          </div>
          <div className="block sm:hidden">
            <ProductsCarrousel products={products} itemsPerPage={1}></ProductsCarrousel>
          </div>
          <div className="flex justify-end mt-6">
            <Link className={buttonVariants({
              size: "lg",
              variant: 'outline',
              className: 'mx-auto ',
            })} href={routes.tienda.productos}>Ver Todos <ArrowRight className="size-4 ml-1.5" />
            </Link>
          </div>
        </MaxWidthWrapper>
      </section >

      {/* Categories display Section */}
      <section className="bg-white">
        <MaxWidthWrapper className="py-6">
          <h2 className="relative w-fit tracking-tight text-balance my-4 font-semibold !leading-tight text-gray-900 text-xl md:text-2xl lg:text-3xl">
            <ArrowDownWideNarrow className="inline-block size-10 mr-4 stroke-sky-600" />
            Explora por <span className="relative px-1 bg-sky-600 text-white">categorias</span>
          </h2>
          <div className="size-full grid grid-cols-1 my-8 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard>
              <Baby className="size-12 stroke-1" />
              <p className="">Niños y Niñas</p>
            </CategoryCard>
            <CategoryCard>
              <Flower2 className="size-12 stroke-1" />
              <p className="">Decoracion</p>
            </CategoryCard>
            <CategoryCard>
              <Gamepad2 className="size-12 stroke-1" />
              <p className="">Gaming</p>
            </CategoryCard>
            <CategoryCard>
              <Drill className="size-12 stroke-1" />
              <p className="">Herramientas & Taller</p>
            </CategoryCard>
            <CategoryCard>
              <PersonStanding className="size-12 stroke-1" />
              <p className="">Utilidades</p>
            </CategoryCard>
            <CategoryCard>
              <BriefcaseBusiness className="size-12 stroke-1" />
              <p className="">Oficina</p>
            </CategoryCard>
            <CategoryCard>
              <CalendarDays className="size-12 stroke-1" />
              <p className="">Organizacion</p>
            </CategoryCard>
            <CategoryCard>
              <ScanFace className="size-12 stroke-1" />
              <p className="">Accesorios</p>
            </CategoryCard>
          </div>
          <div className="flex justify-end">
            <Link className={buttonVariants({
              size: "lg",
              className: 'mx-auto bg-sky-600',
            })} href={routes.tienda.productos}>Ver Todas<ArrowRight className="size-4 ml-1.5" />
            </Link>
          </div>
        </MaxWidthWrapper>
      </section >
    </>
  )
}


//TODO Add imgSrc as required, fetch categories from server
const CategoryCard = ({ href, imgSrc, children }: { href?: string, imgSrc?: string, children: ReactNode }) => {
  return (
    <Link href={href ?? "#"} className="bg-slate-50 col-span-1 h-64 border ring-2 ring-gray-900/50 rounded-lg flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
      {children}
    </Link>
  )
}

export default Tienda