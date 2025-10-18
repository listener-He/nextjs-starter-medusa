import { Button, Text } from "@medusajs/ui"
import React from "react"

interface MapCardProps {
  address?: string
  mapUrl?: string
}

function isLikelyEmbed(url: string) {
  return /iframe|embed|output=embed/i.test(url) || url.includes("/maps/embed")
}

const MapCard: React.FC<MapCardProps> = ({ address, mapUrl }) => {
  const hasMap = Boolean(mapUrl)
  const showIframe = Boolean(mapUrl && isLikelyEmbed(mapUrl))

  return (
    <div className="rounded-lg border border-ui-border-base overflow-hidden">
      <div className="p-4">
        {address && (
          <div>
            <Text className="txt-small text-ui-fg-subtle">Address</Text>
            <Text className="txt-medium text-ui-fg-base break-words">{address}</Text>
          </div>
        )}

        {hasMap && !showIframe && (
          <div className="mt-3">
            <a href={mapUrl!} target="_blank" rel="noreferrer">
              <Button variant="secondary" className="h-10">Open Map</Button>
            </a>
          </div>
        )}
      </div>

      {hasMap && showIframe && (
        <div className="border-t border-ui-border-base">
          <iframe
            src={mapUrl}
            className="w-full h-[280px] rounded-none"
            loading="lazy"
          />
        </div>
      )}
    </div>
  )
}

export default MapCard