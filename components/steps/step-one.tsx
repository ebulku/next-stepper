'use client'

import { Code, Globe, ShoppingCart } from 'lucide-react'

import { type FormOption, useFormStore } from '@/lib/store'

import { OptionCard } from '@/components/option-card'

const options: FormOption[] = [
  {
    id: 'website',
    title: 'Website',
    description:
      'Create a beautiful, responsive website for your business or portfolio',
    icon: Globe,
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
  },
  {
    id: 'webapp',
    title: 'Web Application',
    description:
      'Build a full-featured web application with authentication and database',
    icon: Code,
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2370&auto=format&fit=crop',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description:
      'Set up an online store with product management and payment processing',
    icon: ShoppingCart,
    image:
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2370&auto=format&fit=crop',
  },
]

export function StepOne() {
  const { selections, setSelection } = useFormStore()
  const selectedId = selections[0]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {options.map((option) => (
        <OptionCard
          key={option.id}
          title={option.title}
          description={option.description}
          icon={option.icon}
          image={option.image}
          selected={selectedId === option.id}
          onClick={() => setSelection(0, option.id)}
        />
      ))}
    </div>
  )
}
