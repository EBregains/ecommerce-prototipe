import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button";
import { Sparkles } from "lucide-react";

const NavBar = () => {

  const user = undefined;
  const isAdmin = false;

  return (
    <nav className="sticky z-[100] h-14 md:h-16 inset-x-0 text-base md:text-lg top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold">
            PILAR<span className="opacity-60">3D</span>
          </Link>
          <div className="h-full flex items-center space-x-2 sm:space-x-4">
            {user ?
              (
                <>
                  <Link href='/api/auth/logout' className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
                    Salir
                  </Link>
                  {isAdmin && (<Link href='/api/auth/logout' className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
                    Dashboard ✨
                  </Link>)}
                </>
              ) : (
                <>
                  <Link href='/api/auth/login' className={buttonVariants({ size: 'sm', variant: 'outline' })}>Iniciar Sesion</Link>
                  <Link href='/api/auth/register' className={buttonVariants({ size: 'sm', variant: 'ghost' })}>Registrarse</Link>
                  <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                  <Link href='/asd' className={buttonVariants({ size: 'sm', className: 'hidden sm:flex items-center gap-1 stroke-1' })}>
                    <Sparkles className="mr-1.5 size-4 sm:size-5"></Sparkles>
                    Explora
                  </Link>
                </>
              )
            }
          </div>
        </div>

      </MaxWidthWrapper>
    </nav>
  )
}

export default NavBar;