'use client'

import {
  BlocksIcon,
  BoxIcon,
  BoxesIcon,
  CloudIcon,
  CodeIcon,
  GlobeIcon,
  LayersIcon,
  PencilIcon,
  ServerIcon,
} from 'lucide-react'

import MultiStepForm, { type FormStep } from '@/components/ui/multi-step-form'

const formSteps: FormStep[] = [
  {
    level: 1,
    id: 'project-type',
    title: 'Select Your Project Type',
    description: 'What type of project are you working on?',
    items: [
      {
        id: 'custom',
        title: 'Custom',
        description: 'This is a Card with no image or icon',
        validNextSteps: ['nextjs', 'astro', 'remix', 'next-commerce'],
      },
      {
        id: 'webapp',
        title: 'Web Application',
        description: 'This is a Card with only icon',
        icon: CodeIcon,
        validNextSteps: ['nextjs', 'remix'],
      },
      {
        id: 'website',
        title: 'Website',
        description: 'Card with icon & image',
        image:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
        icon: GlobeIcon,
        validNextSteps: ['nextjs', 'astro'],
      },
      {
        id: 'ecommerce',
        title: 'E-commerce',
        description: 'This is a Card with only image',
        image:
          'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2370&auto=format&fit=crop',
        validNextSteps: ['shopify', 'next-commerce'],
      },
      {
        id: 'blog',
        title: 'Blog',
        description: 'Another Sample',
        icon: PencilIcon,
        image:
          'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2370&auto=format&fit=crop',
        validNextSteps: ['nextjs', 'astro'],
      },
    ],
  },
  {
    level: 2,
    id: 'framework',
    title: 'Choose Framework',
    description: 'Select the framework that fits your project best',
    items: [
      {
        id: 'nextjs',
        title: 'Next.js',
        description:
          'React framework with server-side rendering and static generation',
        icon: BlocksIcon,
        image:
          'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2370&auto=format&fit=crop',
        validNextSteps: ['vercel', 'netlify'],
      },
      {
        id: 'astro',
        title: 'Astro',
        description:
          'Static site builder with excellent performance and flexibility',
        icon: LayersIcon,
        image:
          'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2370&auto=format&fit=crop',
        validNextSteps: ['netlify', 'cloudflare'],
      },
      {
        id: 'remix',
        title: 'Remix',
        description:
          'Full-stack web framework with excellent data loading and mutations',
        icon: BoxesIcon,
        image:
          'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2370&auto=format&fit=crop',
        validNextSteps: ['fly', 'railway'],
      },
      {
        id: 'shopify',
        title: 'Shopify',
        description: 'Complete e-commerce solution with customizable themes',
        icon: BoxesIcon,
        image:
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2370&auto=format&fit=crop',
        validNextSteps: ['shopify-hosting'],
      },
      {
        id: 'next-commerce',
        title: 'Next.js Commerce',
        description: 'Complete e-commerce solution with Next.js and Vercel',
        icon: BlocksIcon,
        image:
          'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2370&auto=format&fit=crop',
        validNextSteps: ['vercel'],
      },
    ],
  },
  {
    level: 3,
    id: 'deployment',
    title: 'Pick Your Deployment',
    description: 'Select the deployment platform that fits your needs best',
    items: [
      {
        id: 'vercel',
        title: 'Vercel',
        description: 'Zero-configuration deployment platform built for Next.js',
        icon: CloudIcon,
        image:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop',
      },
      {
        id: 'netlify',
        title: 'Netlify',
        description: 'Popular platform for automated deployment and hosting',
        icon: ServerIcon,
        image:
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2372&auto=format&fit=crop',
      },
      {
        id: 'cloudflare',
        title: 'Cloudflare Pages',
        description: 'Global edge network with unlimited bandwidth',
        icon: BoxIcon,
        image:
          'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2370&auto=format&fit=crop',
      },
      {
        id: 'fly',
        title: 'Fly.io',
        description: 'Global application platform with edge capabilities',
        icon: CloudIcon,
        image:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop',
      },
      {
        id: 'railway',
        title: 'Railway',
        description: 'Developer platform for deploying any type of application',
        icon: BoxIcon,
        image:
          'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2370&auto=format&fit=crop',
      },
      {
        id: 'shopify-hosting',
        title: 'Shopify Hosting',
        description: 'Built-in hosting solution for Shopify stores',
        icon: CloudIcon,
        image:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop',
      },
    ],
  },
]

export default function MinimalForm() {
  const handleComplete = (selections: Record<string | number, string>) => {
    // handle form completion
    console.log(selections)
    return true
  }

  return <MultiStepForm formSteps={formSteps} onComplete={handleComplete} />
}
