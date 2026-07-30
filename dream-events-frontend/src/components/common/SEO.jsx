import { useEffect } from 'react'

export default function SEO({ title, description }) {
  useEffect(() => {
    // Dynamically update head document title
    document.title = title 
      ? `${title} | Dream Events - Premium Decoration` 
      : 'Dream Events | Premium Event Decoration & Styling Services'

    // Dynamically update description meta tags for search index spiders
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = description || 'Dream Events offers custom event decoration, wedding stages, themed birthday decors, floral backdrops, and corporate styling packages.'
  }, [title, description])

  return null
}
