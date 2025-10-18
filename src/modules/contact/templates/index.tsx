import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MapPin from "@modules/common/icons/map-pin"
import User from "@modules/common/icons/user"
import Section from "@modules/contact/components/section"
import MethodCard from "@modules/contact/components/method-card"
import MapCard from "@modules/contact/components/map-card"

import type { StoreContact } from "@lib/data/store"

function sanitizePhoneForWa(phone?: unknown) {
  if (!phone) return ""
  const normalized = typeof phone === "string" ? phone : String(phone)
  return normalized.replace(/\D/g, "")
}

export default function ContactTemplate({ contact }: { contact: StoreContact }) {
  const hasAny = Object.values(contact || {}).some(Boolean)

  const waNumber = sanitizePhoneForWa(contact.whatsapp || contact.phone)
  const waLink = waNumber ? `https://wa.me/${waNumber}` : undefined
  const telLink = contact.phone ? `tel:${String(contact.phone)}` : undefined
  const emailLink = contact.email ? `mailto:${contact.email}` : undefined

  return (
    <div className="content-container py-12">
      <div className="flex flex-col gap-4 mb-6">
        <Heading level="h1" className="txt-3xlarge">Contact Us</Heading>
        <Text className="text-ui-fg-subtle txt-medium">Reach us via phone, WhatsApp, email, or visit our location.</Text>
      </div>

      {!hasAny && (
        <div className="mt-4 p-6 rounded-lg bg-ui-bg-subtle">
          <Text className="txt-medium text-ui-fg-base">
            Contact details are not configured yet. Please set metadata fields like
            <code className="mx-1">contact_phone</code>,<code className="mx-1">contact_whatsapp</code>,
            <code className="mx-1">contact_email</code>, and <code className="mx-1">contact_address</code>.
          </Text>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 medium:grid-cols-2 gap-8">
        <Section title="Details" icon={<User className="w-5 h-5" />}> 
          <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
            <MethodCard label="Phone" value={contact.phone} actionHref={telLink} actionLabel="Call" />
            <MethodCard label="WhatsApp" value={contact.whatsapp} actionHref={waLink} actionLabel="Chat" />
            <MethodCard label="Email" value={contact.email} actionHref={emailLink} actionLabel="Email" />
            <MethodCard label="Hours" value={contact.hours} />
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {contact.name && (
              <div className="rounded-lg border border-ui-border-base p-4">
                <Text className="txt-small text-ui-fg-subtle">Contact Name</Text>
                <Text className="txt-medium text-ui-fg-base">{contact.name}</Text>
              </div>
            )}
            {contact.wechat && (
              <div className="rounded-lg border border-ui-border-base p-4">
                <Text className="txt-small text-ui-fg-subtle">WeChat</Text>
                <Text className="txt-medium text-ui-fg-base">{contact.wechat}</Text>
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              {telLink && (
                <a href={telLink}><Button className="h-10">Call</Button></a>
              )}
              {waLink && (
                <a href={waLink} target="_blank" rel="noreferrer"><Button variant="secondary" className="h-10">WhatsApp</Button></a>
              )}
              {emailLink && (
                <a href={emailLink}><Button variant="secondary" className="h-10">Email</Button></a>
              )}
            </div>
          </div>
        </Section>

        <div className="flex flex-col gap-6">
          <Section title="Location" icon={<MapPin className="w-5 h-5" />} subtle>
            <MapCard address={contact.address} mapUrl={contact.map_url} />
          </Section>

          <Section title="Quick Links" subtle>
            <div className="grid grid-cols-1 small:grid-cols-2 gap-2">
              <LocalizedClientLink href="/store" className="text-ui-fg-interactive">Browse Products</LocalizedClientLink>
              <LocalizedClientLink href="/account" className="text-ui-fg-interactive">Account</LocalizedClientLink>
              <LocalizedClientLink href="/cart" className="text-ui-fg-interactive">Cart</LocalizedClientLink>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}