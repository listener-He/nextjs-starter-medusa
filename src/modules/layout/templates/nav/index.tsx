import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

export default async function Nav() {
  await listRegions().then((regions: StoreRegion[]) => regions) // reserved for future use

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          {/* Left: Brand */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base"
              data-testid="nav-brand-link"
            >
              fridgera
            </LocalizedClientLink>
          </div>

          {/* Center: Top menu */}
          <div className="hidden small:flex items-center gap-x-8 h-full">
            <LocalizedClientLink href="/" className="hover:text-ui-fg-base" data-testid="nav-home-link">
              Home
            </LocalizedClientLink>
            <LocalizedClientLink href="/store" className="hover:text-ui-fg-base" data-testid="nav-products-link">
              Products
            </LocalizedClientLink>
            <LocalizedClientLink href="/contact" className="hover:text-ui-fg-base" data-testid="nav-contact-link">
              Contact Us
            </LocalizedClientLink>
          </div>

          {/* Right: Account & Cart */}
          <div className="flex items-center gap-x-6 h-full">
            <LocalizedClientLink
              className="hover:text-ui-fg-base"
              href="/account"
              data-testid="nav-account-link"
            >
              Account
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
