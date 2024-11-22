'use client'

import { Blocks, Boxes, Layers } from 'lucide-react'

import { type FormOption, useFormStore } from '@/lib/store'

import { OptionCard } from '@/components/option-card'

const OPTIONS_BY_TYPE: Record<string, FormOption[]> = {
  website: [
    {
      id: 'next',
      title: 'Next.js',
      description:
        'React framework with server-side rendering and static generation',
      icon: Blocks,
      image:
        'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2370&auto=format&fit=crop',
    },
    {
      id: 'astro',
      title: 'Astro',
      description:
        'Static site builder with excellent performance and flexibility',
      icon: Layers,
      image:
        'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2370&auto=format&fit=crop',
    },
  ],
  webapp: [
    {
      id: 'next',
      title: 'Next.js',
      description:
        'Full-stack React framework with API routes and database integration',
      icon: Blocks,
      image:
        'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2370&auto=format&fit=crop',
    },
    {
      id: 'remix',
      title: 'Remix',
      description:
        'Full-stack web framework with excellent data loading and mutations',
      icon: Boxes,
      image:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2370&auto=format&fit=crop',
    },
  ],
  ecommerce: [
    {
      id: 'shopify',
      title: 'Shopify',
      description: 'Complete e-commerce solution with customizable themes',
      icon: Boxes,
      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2370&auto=format&fit=crop',
    },
    {
      id: 'next-commerce',
      title: 'Next.js Commerce',
      description: 'Customizable e-commerce platform built on Next.js',
      icon: Blocks,
      image:
        'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2370&auto=format&fit=crop',
    },
  ],
}

export function StepTwo() {
  const { selections, setSelection } = useFormStore()
  const projectType = selections[0]
  const selectedId = selections[1]
  const options = OPTIONS_BY_TYPE[projectType] || []

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
          onClick={() => setSelection(1, option.id)}
        />
      ))}
    </div>
  )
}
