const siteUrl = import.meta.env.VITE_SITE_URL || 'https://akshat.dev'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Akshat',
    url: siteUrl,
    image: `${siteUrl}/hero.png`,
    jobTitle: 'Software Engineering Student',
    description: 'B.Tech CSE student at Chandigarh University passionate about software development, algorithms, and AI systems.',
    email: 'kakshat349@gmail.com',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Chandigarh University',
    },
    knowsAbout: ['Python', 'C++', 'React', 'Data Structures', 'Algorithms', 'JavaScript'],
    sameAs: [
      'https://github.com/Akshat-ak-hub',
      'https://linkedin.com/in/akshat-167271347',
      'https://leetcode.com/Akshat__15_',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}