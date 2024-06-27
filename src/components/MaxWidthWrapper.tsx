import { cn } from "@/utils/utils"
import { ReactNode } from "react"

const MaxWidthWrapper = ({
  className,
  children
}: {
  className?: string,
  children: ReactNode
}
) => {

  return (<div className={cn("h-full w-full max-w-screen-xl mx-auto px-3 md:px-200", className)}>
    {children}
  </div>)
}

export default MaxWidthWrapper