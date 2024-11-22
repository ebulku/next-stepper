'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { Card } from '@/components/ui/card'

interface OptionCardProps {
  title: string
  description: string
  icon: LucideIcon
  image: string
  selected?: boolean
  onClick?: () => void
}

export function OptionCard({
  title,
  description,
  icon: Icon,
  image,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card
        className={cn(
          'relative h-full cursor-pointer overflow-hidden transition-colors',
          'border-2',
          selected
            ? 'border-primary bg-primary/5'
            : 'hover:border-primary/50 hover:bg-accent'
        )}
        onClick={onClick}
      >
        <div className="relative h-48 w-full bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80'
            )}
          />
        </div>
        <div className="p-6">
          <div className="mb-4 flex items-center gap-4">
            <div
              className={cn(
                'rounded-full p-2',
                selected ? 'bg-primary text-primary-foreground' : 'bg-muted'
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </Card>
    </motion.div>
  )
}
