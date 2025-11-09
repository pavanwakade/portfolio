import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title = 'Pavan Wakade | Full Stack Java Developer',
  description = 'Experienced Full Stack Java Developer specializing in Spring Boot, React, microservices, and scalable web applications.',
  keywords = 'Pavan Wakade, Full Stack Developer, Java Developer, Spring Boot, React, Microservices',
  ogImage = 'https://pavanwakade.com/og-image.jpg',
  url = 'https://pavanwakade.com/'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  )
}

export default SEO
