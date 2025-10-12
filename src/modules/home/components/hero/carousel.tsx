"use client"

import { useEffect, useState } from "react"
import { Heading, Button, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Item = {
  image?: string | null
  handle?: string | null
}

export default function HeroCarousel({ items }: { items: Item[] }) {
  const validItems = items.filter((i) => !!i.image)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (validItems.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % validItems.length)
    }, 5000)
    return () => clearInterval(id)
  }, [validItems.length])

  const current = validItems[index] || {}
  const ctaHref = current.handle ? `/products/${current.handle}` : "/"

  return (
    <div
      className="h-[75vh] w-full border-b border-ui-border-base relative"
      style={current.image ? { backgroundImage: `url(${current.image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading level="h1" className="text-4xl leading-10 text-white font-normal">
            Timeless Elegance: 2025 Collection
          </Heading>
          <Text className="text-ui-fg-on-color text-base mt-2 max-w-2xl">
            Discover our new collection where classic design meets modern sophistication. Pieces crafted with the finest materials for a look that is both timeless and contemporary.
          </Text>
        </span>
        <LocalizedClientLink href={ctaHref}>
          <Button className="mt-4">Shop Now</Button>
        </LocalizedClientLink>
        {validItems.length > 1 && (
          <div className="absolute bottom-6 flex items-center gap-3">
            <button
              aria-label="Previous"
              className="text-white/80 hover:text-white px-3 py-1"
              onClick={() => setIndex((i) => (i - 1 + validItems.length) % validItems.length)}
            >
              ‹
            </button>
            <div className="flex gap-1">
              {validItems.map((_, i) => (
                <span key={i} className={`inline-block w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`} />
              ))}
            </div>
            <button
              aria-label="Next"
              className="text-white/80 hover:text-white px-3 py-1"
              onClick={() => setIndex((i) => (i + 1) % validItems.length)}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  )
}