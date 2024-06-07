import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface Model3DProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string,
  dark?: boolean
}

const Model3D = ({ imgSrc, className, dark = false, ...props }: Model3DProps) => {
  return (
    <div
      className={cn("relative pointer-events-none z-50 overflow-hidden", className)}
      {...props}
    >
      <img
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"}
        className="relative pointer-events-none z-50"
        alt="A generic 3D Model"
      />
      <div className="absolute -z-10 inset-0">
        <img
          className="object-cover"
          src={imgSrc}
          alt="Overlaying phone"
        />
      </div>
    </div>


  )
}

export default Model3D;