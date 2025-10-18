import { Metadata } from "next"
import ContactTemplate from "@modules/contact/templates"
import { getContactInfo } from "@lib/data/store"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us",
}

export default async function ContactPage(props: { params: Promise<{ countryCode: string }> }) {
  const params = await props.params
  const contact = await getContactInfo(params.countryCode)

  return <ContactTemplate contact={contact} />
}