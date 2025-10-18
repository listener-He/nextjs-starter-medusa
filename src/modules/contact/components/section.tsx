import { Heading, clx } from "@medusajs/ui"
import React from "react"

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  icon?: React.ReactNode
  subtle?: boolean
}

const Section: React.FC<SectionProps> = ({ title, icon, subtle = false, className, children, ...rest }) => {
  return (
    <section
      className={clx(
        "flex flex-col gap-4",
        subtle ? "bg-ui-bg-subtle rounded-lg p-4" : undefined,
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-3">
        {icon}
        <Heading level="h2" className="txt-xlarge">{title}</Heading>
      </div>
      {children}
    </section>
  )
}

export default Section