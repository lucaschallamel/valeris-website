// Config
// ------------
// Description: Site-wide configuration for Valeris Coaching

export interface Logo {
  src: string
  alt: string
}

export type Mode = 'auto' | 'light' | 'dark'

export interface Config {
  siteTitle: string
  siteDescription: string
  ogImage: string
  logo: Logo
  canonical: boolean
  noindex: boolean
  mode: Mode
  scrollAnimations: boolean
}

export const configData: Config = {
  siteTitle: 'Valeris Coaching',
  siteDescription:
    'Conseil en leadership technologique pour les entreprises suisses',
  ogImage: '/og.jpg',
  logo: {
    src: '/favicon.svg',
    alt: 'Valeris Coaching'
  },
  canonical: true,
  noindex: false,
  mode: 'light',
  scrollAnimations: true
}
