"use client"

import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import ChevronDown from "@modules/common/icons/chevron-down"
import { useState } from "react"

type RefinementListProps = {
  categories?: HttpTypes.StoreProductCategory[]
  'data-testid'?: string
}

const RefinementList = ({ categories, 'data-testid': dataTestId }: RefinementListProps) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isStorePage = pathname?.includes("/store")

  return (
    <div className="flex small:flex-col gap-6 small:gap-12 py-4 mb-6 px-0 pl-0 small:min-w-[250px] small:ml-[1.675rem]" data-testid={dataTestId}>
      {categories && categories.length > 0 && (
        <div className="w-full">
          {/* Mobile toggle */}
          <button
            className="small:hidden flex items-center justify-between w-full py-2 px-2 bg-ui-bg-subtle rounded-base text-small-regular"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-ui-fg-subtle">Filters</span>
            <ChevronDown className={clx("transition-transform duration-200", open ? "rotate-180" : "rotate-0")} />
          </button>

          {/* Categories block: always visible on desktop, collapsible on mobile */}
          <div className={clx("small:mb-6 mt-2", open ? "block" : "hidden", "small:block")}>
            <div className="text-small-regular text-ui-fg-subtle mb-2">Categories</div>
            <ul className="grid grid-cols-1 gap-2">
              <li>
                <LocalizedClientLink
                  href="/store"
                  className={isStorePage ? "text-ui-fg-base font-medium" : "text-ui-fg-subtle hover:text-ui-fg-base"}
                  aria-current={isStorePage ? "page" : undefined}
                >
                  All
                </LocalizedClientLink>
              </li>
              {categories.map((c) => {
                const isActive = pathname?.includes(`/categories/${c.handle}`)
                return (
                  <li key={c.id}>
                    <LocalizedClientLink
                      href={`/categories/${c.handle}`}
                      className={isActive ? "text-ui-fg-base font-medium" : "text-ui-fg-subtle hover:text-ui-fg-base"}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {c.name}
                    </LocalizedClientLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default RefinementList
