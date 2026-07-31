import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Coconut Co.'
const SITE_URL = 'https://coconutco.in'
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1618928628339-f70e35fdbb73?w=1200&h=630&fit=crop'
const DEFAULT_DESCRIPTION = 'Pure coconut products from Kerala\'s farms — virgin coconut oil, protein bars, coconut sugar, snacks, and more. No additives. No shortcuts.'

function SEO({ title, description, image, url, type = 'website' }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Pure Coconut Products`
  const metaDescription = description || DEFAULT_DESCRIPTION
  const metaImage = image || DEFAULT_IMAGE
  const metaUrl = url ? `${SITE_URL}${url}` : SITE_URL

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph (Facebook, WhatsApp previews) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  )
}

export default SEO