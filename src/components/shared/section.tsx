import React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from 'lib/utils'

const sectionVariants = cva('max-w-7xl w-full mx-auto px-6', {
  variants: {
    size: {
      default: 'max-w-7xl',
      tiny: 'max-w-sm',
      sm: 'max-w-xl',
      lg: 'max-w-5xl'
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(({ className, size, ...props }, ref) => {
  const Comp = 'div'
  return <Comp className={cn(sectionVariants({ size, className }))} {...props} ref={ref} />
})
Section.displayName = 'Section'

export { Section, sectionVariants }
