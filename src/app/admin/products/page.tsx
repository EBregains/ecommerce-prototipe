import { buttonVariants } from "@/components/ui/button";

export default async function PrivatePage() {


  return (
    <section className="p-6">
      <a href="products/add" className={buttonVariants({
        size: 'lg'
      })}>Agregar un nuevo producto</a>
    </section>
  )

}