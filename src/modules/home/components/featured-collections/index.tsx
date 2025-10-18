import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

export default async function FeaturedCollections({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  const featured = collections.slice(0, 2)

  const cleanUrl = (url?: string | null) => {
    if (!url) return undefined
    const trimmed = url.trim()
    return trimmed.endsWith(")") ? trimmed.slice(0, -1) : trimmed
  }

  const items = await Promise.all(
    featured.map(async (collection) => {
      const {
        response: { products },
      } = await listProducts({
        regionId: region.id,
        queryParams: { collection_id: [collection.id], limit: 2 },
      })

      return products.map((product) => ({
        collection,
        product,
        image: cleanUrl(product?.thumbnail || product?.images?.[0]?.url),
      }))
    })
  ).then((nested) => nested.flat())

  return (
    <div className="content-container py-12">
      <Text className="txt-xlarge mb-6 text-center">Featured Collections</Text>
      <ul className="grid grid-cols-1 small:grid-cols-2 gap-6">
        {items.map(({ collection, product }) => (
          <li key={`${collection.id}-${product.id}`} className="border rounded-lg overflow-hidden bg-white">
            <LocalizedClientLink href={product?.handle ? `/products/${product.handle}` : `/collections/${collection.handle}`}>
              <div className="h-[320px] w-full">
                {product ? (
                  <Thumbnail thumbnail={product.thumbnail} images={product.images} size="full" isFeatured />
                ) : (
                  <div className="h-full w-full bg-ui-bg-subtle" />
                )}
              </div>
              <div className="p-4">
                <Text className="txt-large text-center">{product?.title || collection.title}</Text>
                {product?.description && (
                  <Text className="txt-small text-ui-fg-subtle mt-2">{product.description}</Text>
                )}
              </div>
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </div>
  )
}