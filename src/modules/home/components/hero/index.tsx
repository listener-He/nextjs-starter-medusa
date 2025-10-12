import { HttpTypes } from "@medusajs/types"
import { listProducts } from "@lib/data/products"
import HeroCarousel from "./carousel"

const Hero = async ({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) => {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: { collection_id: collection.id, limit: 10 },
  })

  const items = (products || []).map((p) => ({
    image: p.thumbnail || p.images?.[0]?.url,
    handle: p.handle,
  }))

  return <HeroCarousel items={items} />
}

export default Hero
