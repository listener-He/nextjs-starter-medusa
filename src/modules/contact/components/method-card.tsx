import { Button, Text, clx } from "@medusajs/ui"
import React from "react"

interface MethodCardProps {
  label: string
  value?: React.ReactNode
  actionHref?: string
  actionLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  compact?: boolean
}

const MethodCard: React.FC<MethodCardProps> = ({
  label,
  value,
  actionHref,
  actionLabel,
  secondaryHref,
  secondaryLabel,
  compact = false,
}) => {
  return (
    <div className={clx(
      "rounded-lg border border-ui-border-base p-4",
      compact ? "py-3" : "p-4",
      "flex items-start justify-between gap-4"
    )}>
      <div className="min-w-0">
        <Text className="txt-small text-ui-fg-subtle">{label}</Text>
        {value ? (
          <div className="mt-1">
            {typeof value === "string" ? (
              <Text className="txt-medium text-ui-fg-base break-words">{value}</Text>
            ) : (
              value
            )}
          </div>
        ) : (
          <Text className="txt-small text-ui-fg-muted">Not provided</Text>
        )}
      </div>

      <div className="flex-shrink-0 flex items-center gap-2">
        {actionHref && actionLabel && (
          <a href={actionHref} target={actionHref.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            <Button size="small" className="h-9">{actionLabel}</Button>
          </a>
        )}
        {secondaryHref && secondaryLabel && (
          <a href={secondaryHref} target={secondaryHref.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            <Button size="small" variant="secondary" className="h-9">{secondaryLabel}</Button>
          </a>
        )}
      </div>
    </div>
  )
}

export default MethodCard