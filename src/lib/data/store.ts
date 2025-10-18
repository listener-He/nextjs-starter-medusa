"use server"

import { getRegion } from "./regions"
import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"

export type StoreContact = {
  name?: string
  phone?: string
  whatsapp?: string
  email?: string
  address?: string
  hours?: string
  wechat?: string
  map_url?: string
}

export async function getContactInfo(countryCode: string): Promise<StoreContact> {
  // Try to fetch fresh regions data without cache to ensure updated metadata
  let region: HttpTypes.StoreRegion | null | undefined = null
  try {
    const { regions } = await sdk.client.fetch<{ regions: HttpTypes.StoreRegion[] }>(
      "/store/regions",
      {
        method: "GET",
        cache: "no-store",
      }
    )
    region = regions?.find((r) => r.countries?.some((c) => c.iso_2 === countryCode))
  } catch {
    // Silent fallback to cached getRegion below
  }

  if (!region) {
    region = await getRegion(countryCode)
  }

  const md = (region?.metadata ?? {}) as Record<string, any>

  const name = md.contact_name ?? process.env.NEXT_PUBLIC_CONTACT_NAME
  const phone = md.contact_phone ?? process.env.NEXT_PUBLIC_CONTACT_PHONE
  const whatsapp = md.contact_whatsapp ?? process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? phone
  const email = md.contact_email ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL
  const address = md.contact_address ?? process.env.NEXT_PUBLIC_CONTACT_ADDRESS
  const hours = md.contact_hours ?? process.env.NEXT_PUBLIC_CONTACT_HOURS
  const wechat = md.contact_wechat ?? process.env.NEXT_PUBLIC_CONTACT_WECHAT
  const map_url = md.contact_map_url ?? process.env.NEXT_PUBLIC_CONTACT_MAP_URL

  return {
    name,
    phone,
    whatsapp,
    email,
    address,
    hours,
    wechat,
    map_url,
  }
}