'use client'

import { Code, Globe, ShoppingCart, Blocks, Layers, Boxes, Cloud, Server, Box } from 'lucide-react'
import { type StepOptions } from '@/lib/store'

import { MultiStepForm } from '@/components/multi-step-form'

const formOptions: StepOptions = {
  title: 'Select Your Project Type',
  options: [
    {
      id: 'website',
      title: 'Website',
      description: 'Create a beautiful, responsive website for your business or portfolio',
      icon: Globe,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
      next: {
        title: 'Choose Your Framework',
        options: [
          {
            id: 'next',
            title: 'Next.js',
            description: 'React framework with server-side rendering and static generation',
            icon: Blocks,
            image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2370&auto=format&fit=crop',
            next: {
              title: 'Pick Your Deployment',
              options: [
                {
                  id: 'vercel',
                  title: 'Vercel',
                  description: 'Zero-configuration deployment platform built for Next.js',
                  icon: Cloud,
                  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop',
                },
                {
                  id: 'netlify',
                  title: 'Netlify',
                  description: 'Popular platform for automated deployment and hosting',
                  icon: Server,
                  image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2372&auto=format&fit=crop',
                },
              ],
            },
          },
          {
            id: 'astro',
            title: 'Astro',
            description: 'Static site builder with excellent performance and flexibility',
            icon: Layers,
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2370&auto=format&fit=crop',
            next: {
              title: 'Pick Your Deployment',
              options: [
                {
                  id: 'netlify',
                  title: 'Netlify',
                  description: 'Perfect for static sites with excellent build times',
                  icon: Server,
                  image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2372&auto=format&fit=crop',
                },
                {
                  id: 'cloudflare',
                  title: 'Cloudflare Pages',
                  description: 'Global edge network with unlimited bandwidth',
                  icon: Box,
                  image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2370&auto=format&fit=crop',
                },
              ],
            },
          },
        ],
      },
    },
    {
      id: 'webapp',
      title: 'Web Application',
      description: 'Build a full-featured web application with authentication and database',
      icon: Code,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2370&auto=format&fit=crop',
      next: {
        title: 'Choose Your Framework',
        options: [
          {
            id: 'next',
            title: 'Next.js',
            description: 'Full-stack React framework with API routes and database integration',
            icon: Blocks,
            image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2370&auto=format&fit=crop',
            next: {
              title: 'Pick Your Deployment',
              options: [
                {
                  id: 'vercel',
                  title: 'Vercel',
                  description: 'Zero-configuration deployment platform built for Next.js',
                  icon: Cloud,
                  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop',
                },
                {
                  id: 'netlify',
                  title: 'Netlify',
                  description: 'Popular platform for automated deployment and hosting',
                  icon: Server,
                  image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2372&auto=format&fit=crop',
                },
              ],
            },
          },
          {
            id: 'remix',
            title: 'Remix',
            description: 'Full-stack web framework with excellent data loading and mutations',
            icon: Boxes,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2370&auto=format&fit=crop',
            next: {
              title: 'Pick Your Deployment',
              options: [
                {
                  id: 'fly',
                  title: 'Fly.io',
                  description: 'Global application platform with edge capabilities',
                  icon: Cloud,
                  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop',
                },
                {
                  id: 'railway',
                  title: 'Railway',
                  description: 'Developer platform for deploying any type of application',
                  icon: Box,
                  image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2370&auto=format&fit=crop',
                },
              ],
            },
          },
        ],
      },
    },
    {
      id: 'ecommerce',
      title: 'E-commerce',
      description: 'Set up an online store with product management and payment processing',
      icon: ShoppingCart,
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2370&auto=format&fit=crop',
      next: {
        title: 'Choose Your Framework',
        options: [
          {
            id: 'shopify',
            title: 'Shopify',
            description: 'Complete e-commerce solution with customizable themes',
            icon: Boxes,
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2370&auto=format&fit=crop',
            next: {
              title: 'Pick Your Deployment',
              options: [
                {
                  id: 'shopify-hosting',
                  title: 'Shopify Hosting',
                  description: 'Built-in hosting solution for Shopify stores',
                  icon: Cloud,
                  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop',
                },
              ],
            },
          },
          {
            id: 'next',
            title: 'Next.js Commerce',
            description: 'Complete e-commerce solution with Next.js and Vercel',
            icon: Blocks,
            image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2370&auto=format&fit=crop',
            next: {
              title: 'Pick Your Deployment',
              options: [
                {
                  id: 'vercel',
                  title: 'Vercel',
                  description: 'Zero-configuration deployment platform built for Next.js',
                  icon: Cloud,
                  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop',
                },
              ],
            },
          },
        ],
      },
    },
  ],
}

export default function FormContainer() {
  return <MultiStepForm formOptions={formOptions} />
}