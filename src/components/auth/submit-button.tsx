'use client'
import { useFormStatus } from "react-dom";
import { buttonVariants } from "../ui/button";
import { Loader, LoaderCircle } from "lucide-react";

export function SubmitButton(
  { text, variant = 'default', className = '', size = 'lg' }
    :
    {
      text: string,
      variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined,
      className?: string,
      size?: 'lg' | 'sm',
    }) {

  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className={buttonVariants({
        size: size,
        variant: variant,
        className: className,
      })}
      disabled={pending}
      aria-disabled={pending}
    >
      {!pending ? text : <LoaderCircle className="size-4 animate-spin"></LoaderCircle>}
    </button>
  )
}