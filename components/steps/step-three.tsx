'use client'

import { Box, Cloud, Server } from 'lucide-react'

import { type FormOption, useFormStore } from '@/lib/store'

import { OptionCard } from '@/components/option-card'

const OPTIONS_BY_TYPE: Record<string, FormOption[]> = {
  next: [
    {
      id: 'vercel',
      title: 'Vercel',
      description: 'Zero-configuration deployment platform built for Next.js',
      icon: Cloud,
      image:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop',
    },
    {
      id: 'netlify',
      title: 'Netlify',
      description: 'Popular platform for automated deployment and hosting',
      icon: Server,
      image:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2372&auto=format&fit=crop',
    },
  ],
  astro: [
    {
      id: 'netlify',
      title: 'Netlify',
      description: 'Perfect for static sites with excellent build times',
      icon: Server,
      image:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2372&auto=format&fit=crop',
    },
    {
      id: 'cloudflare',
      title: 'Cloudflare Pages',
      description: 'Global edge network with unlimited bandwidth',
      icon: Box,
      image:
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2370&auto=format&fit=crop',
    },
  ],
  remix: [
    {
      id: 'fly',
      title: 'Fly.io',
      description: 'Global application platform with edge capabilities',
      icon: Cloud,
      image:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop',
    },
    {
      id: 'railway',
      title: 'Railway',
      description: 'Developer platform for deploying any type of application',
      icon: Box,
      image:
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2370&auto=format&fit=crop',
    },
  ],
  shopify: [
    {
      id: 'shopify-hosting',
      title: 'Shopify Hosting',
      description: 'Built-in hosting solution for Shopify stores',
      icon: Cloud,
      image:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop',
    },
  ],
  'next-commerce': [
    {
      id: 'vercel',
      title: 'Vercel',
      description: 'Optimized for Next.js Commerce deployments',
      icon: Cloud,
      image:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop',
    },
  ],
}

export function StepThree() {
  const { selections, setSelection } = useFormStore()
  const framework = selections[1]
  const selectedId = selections[2]
  const options = OPTIONS_BY_TYPE[framework] || []

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {options.map((option) => (
        <OptionCard
          key={option.id}
          title={option.title}
          description={option.description}
          icon={option.icon}
          image={option.image}
          selected={selectedId === option.id}
          onClick={() => setSelection(2, option.id)}
        />
      ))}
    </div>
  )
}
