import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper"
import { routes } from "@/lib/routes";

const Footer = () => {
  return (
    <footer className="bg-white h-20 relative">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200" />

        <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          <div className="text-center md:text-left pb-2 md:pb-0">
            <p className="text-sm text-muted-foreground">
              Emiliano Bregains &copy; {new Date().getFullYear()}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex space-x-8">
              <Link href={routes.politica.terminos} className="text-sm text-muted-foreground hover:text-gray-600">Terminos y Condiciones</Link>
              <Link href={routes.politica.privacidad} className="text-sm text-muted-foreground hover:text-gray-600">Politica de privacidad</Link>
              <Link href={routes.politica.cookies} className="text-sm text-muted-foreground hover:text-gray-600">Politica de Cookies</Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer;