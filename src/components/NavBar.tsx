import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button";
import { ShoppingCart, Store } from "lucide-react";
import { routes } from "@/lib/routes";
import { createClient } from "@/utils/supabase/server";
import { signout } from "@/app/(shop)/auth/actions";
import { Icons } from "@/lib/Icons";



const NavBar = async () => {

  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser();

  const isAdmin = data.user?.email === process.env.ADMIN_EMAIL;

  //@ts-ignore
  const { data: productsInCart } = await supabase.from("cart").select('id, products ( title, slug, images, base_price ), color, plastic, size, definition, quantity').order('added_at', { ascending: true }) as { data: productInCart[], error: any }

  let items_quantity: number = 0;
  for (let index = 0; index < productsInCart.length; index++) {
    items_quantity += productsInCart[index].quantity;
  }

  return (
    <nav className="sticky z-[100] h-14 md:h-16 inset-x-0 text-base md:text-lg top-0 w-full bg-white transition-all">
      <MaxWidthWrapper>
        <div className="flex h-full items-center justify-between">
          <Link href={routes.home} className="flex hover:scale-105 transition-transform items-center z-40 font-semibold">
            <Icons.logo className="h-12 w-32 mr-2" />
          </Link>
          <div className="h-full flex items-center space-x-2 sm:space-x-2">
            {data.user ?
              (
                <>
                  {isAdmin && (<Link href={routes.admin.dashboard} className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
                    Dashboard ✨
                  </Link>)}
                  <form action={signout}>
                    <button type="submit" className={'text-gray-500/90 hover:underline underline-offset-2 text-xs leading-none'}>
                      Cerrar Sesion
                    </button>
                  </form>
                  <ShoppingCartButton items_quantity={items_quantity} />
                  <Link href={routes.tienda.home} className={buttonVariants({ size: 'sm', className: 'items-center rounded-none gap-1 stroke-1 bg-sky-600' })}>
                    <Store className="mr-1.5 size-4 sm:size-5"></Store>
                    Tienda
                  </Link>
                </>
              ) : (
                <>
                  <Link href={routes.auth.login} className={buttonVariants({ size: 'sm', variant: 'outline', className: 'rounded-none ' })}>Ingresar</Link>
                  <Link href={routes.tienda.home} className={buttonVariants({ size: 'sm', className: 'items-center rounded-none gap-1 stroke-1 bg-sky-600' })}>
                    <Store className="mr-1.5 size-4 sm:size-5"></Store>
                    Tienda
                  </Link>
                </>
              )
            }
          </div>
        </div>
      </MaxWidthWrapper>
    </nav >
  )
}

function ShoppingCartButton({ items_quantity }: { items_quantity: number }) {
  return (
    <Link href={routes.carrito} className={buttonVariants({ size: 'sm', variant: 'ghost', className: 'rounded-full relative px-1' })}>
      <ShoppingCart className="size-5" />
      {items_quantity > 0 &&
        <div className="absolute right-2 top-[0.1rem] p-1 size-[0.85rem] bg-sky-600 rounded-sm flex items-center justify-center">
          <p className="m-0 p-0 font-light leading-tight text-[0.6rem] text-white">{items_quantity > 9 ? "+9" : items_quantity}</p>
        </div>}
    </Link>
  )
}

export default NavBar;