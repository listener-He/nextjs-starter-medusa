import { Text } from "@medusajs/ui"

export default async function Footer() {
  return (
    <footer className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex w-full items-center justify-center py-12">
          <Text className="text-ui-fg-subtle text-small">
            © {new Date().getFullYear()} STORE. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
