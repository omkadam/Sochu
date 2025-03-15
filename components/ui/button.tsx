import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive uppercase tracking-wide",
  {
    variants: {
      variant: {
        locked: "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",
        default: "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500",
        primary: "bg-sky-400 text-white hover:bg-sky-500 border-sky-500 border-b-4 active:border-b-0",
        secondary: "bg-green-500 text-white hover:bg-green-600 border-green-600 border-b-4 active:border-b-0",
        danger: "bg-rose-500 text-white hover:bg-rose-600 border-rose-600 border-b-4 active:border-b-0",
        super: "bg-indigo-500 text-white hover:bg-indigo-600 border-indigo-600 border-b-4 active:border-b-0",
        lessonButtonsbhai: "bg-[#009aef] text-white hover:bg-[#1175c9] border-[#1175c9] border-b-4 active:border-b-0",
        lessonButtonsbhai2: "bg-[#ffcd02] text-white hover:bg-[#b79400] border-[#b79400] border-b-4 active:border-b-0",
        metallic: "relative bg-[linear-gradient(145deg,#ffd700,#ffae00)] text-black border-yellow-500 shadow-[inset_2px_2px_5px_#d4a017,inset_-2px_-2px_5px_#ffcc00] overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_70%)] before:opacity-50 before:pointer-events-none",
        
        // 🚀 **New Metallic Button Variants**
        "metallic-silver": "bg-[linear-gradient(145deg,#b8b8b8,#f0f0f0)] text-black border-gray-400 shadow-[inset_2px_2px_5px_#a8a8a8,inset_-2px_-2px_5px_#ffffff]",
        "metallic-gold": "bg-[linear-gradient(145deg,#ffd700,#ffae00)] text-black border-yellow-500 shadow-[inset_2px_2px_5px_#d4a017,inset_-2px_-2px_5px_#ffcc00]",
        "metallic-blue": "bg-[linear-gradient(145deg,#4a90e2,#0052cc)] text-white border-blue-500 shadow-[inset_2px_2px_5px_#357ebd,inset_-2px_-2px_5px_#66a3ff]",
        "metallic-purple": "bg-[linear-gradient(145deg,#8e44ad,#5e3370)] text-white border-purple-500 shadow-[inset_2px_2px_5px_#732d91,inset_-2px_-2px_5px_#b97dcc]",
        "metallic-red": "bg-[linear-gradient(145deg,#ff4b4b,#c0392b)] text-white border-red-500 shadow-[inset_2px_2px_5px_#b83030,inset_-2px_-2px_5px_#ff6666]",
      },
      size: {
        default: "h-11 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 px-6 has-[>svg]:px-4",
        icon: "size-9",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
