import { listProducts, listProductsWithSort } from "@lib/data/products"
import { getCollectionByHandle } from "@lib/data/collections"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import ProductPreview from "@modules/products/components/product-preview"

export default async function NewArrivals({
  region,
  countryCode,
}: {
  region: HttpTypes.StoreRegion
  countryCode: string
}) {
  // Fetch products from the dedicated home recommendation collection
  const recommendCollection = await getCollectionByHandle("hone_recommend").catch(
    () => null
  )

  let latestProducts: HttpTypes.StoreProduct[] = []

  if (recommendCollection) {
    const {
      response: { products },
    } = await listProducts({
      regionId: region.id,
      queryParams: { collection_id: recommendCollection.id, limit: 4 },
      countryCode,
    })
    latestProducts = products
  } else {
    // Fallback to generic latest
    const {
      response: { products },
    } = await listProductsWithSort({
      page: 1,
      queryParams: { limit: 4 },
      sortBy: "created_at",
      countryCode,
    })
    latestProducts = products
  }

  if (!latestProducts?.length) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-center mb-8">
        <Text className="txt-xlarge text-center">New Arrivals</Text>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-6 gap-y-24">
        {latestProducts.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} />
          </li>
        ))}
      </ul>
    </div>
  )
}