import { Metadata } from "next"

import FeaturedCollections from "@modules/home/components/featured-collections"
import Hero from "@modules/home/components/hero"
import NewArrivals from "@modules/home/components/new-arrivals"
import { getCollectionByHandle, listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Fridgera STORE",
  description:
    "Discover amazing products at our online store.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Fetch specific collections by handle for homepage sections
  const bannerCollection = await getCollectionByHandle("home_banner").catch(
    () => null
  )

  const waistbandCollections = await listCollections({
    handle: "home_waistband",
    fields: "id, handle, title",
  }).then(({ collections }) => collections.slice(0, 2))

  return (
    <>
      {bannerCollection && <Hero collection={bannerCollection} region={region} />}
      <FeaturedCollections collections={waistbandCollections} region={region} />
      <NewArrivals region={region} countryCode={countryCode} />
    </>
  )
}
