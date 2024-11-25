'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeftIcon, LucideIcon } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'
import { create } from 'zustand'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface FormState {
  currentStep: number
  selections: Record<number, string>
  setStep: (step: number) => void
  setSelection: (step: number, optionId: string, totalSteps: number) => void
  resetForm: () => void
}

const useFormStore = create<FormState>((set) => ({
  currentStep: 0,
  selections: {},
  setStep: (step) => set({ currentStep: step }),
  setSelection: (step, optionId, totalSteps) =>
    set((state) => ({
      selections: { ...state.selections, [step]: optionId },
      currentStep: step < totalSteps - 1 ? step + 1 : state.currentStep,
    })),
  resetForm: () => set({ currentStep: 0, selections: {} }),
}))

export type FormStep = {
  level: number
  id: string
  title: string
  description?: string
  items: FormItem[]
}

export type FormItem = {
  id: string
  title: string
  description?: string
  icon?: LucideIcon
  image?: string
  validNextSteps?: string[]
}

interface OptionCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  image?: string
  selected?: boolean
  onClick?: () => void
  variant?: 'default' | 'compact'
  cardClassName?: string
  imageClassName?: string
  iconClassName?: string
}

function OptionCard({
  title,
  description,
  icon: Icon,
  image,
  selected,
  onClick,
  variant = 'default',
  cardClassName,
  imageClassName,
  iconClassName,
}: OptionCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary',
        selected && 'ring-2 ring-primary',
        cardClassName
      )}
      onClick={onClick}
    >
      {variant === 'default' ? (
        <>
          {image ? (
            <div className={cn('relative h-32', imageClassName)}>
              <Image src={image} alt={title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
              {Icon && (
                <Icon
                  className={cn(
                    'absolute bottom-3 left-3 h-6 w-6 text-white',
                    iconClassName
                  )}
                />
              )}
            </div>
          ) : (
            Icon && (
              <div
                className={cn(
                  'flex items-center justify-center h-32 bg-muted',
                  imageClassName
                )}
              >
                <Icon
                  className={cn(
                    'h-12 w-12 text-muted-foreground',
                    iconClassName
                  )}
                />
              </div>
            )
          )}
          <div className="p-4">
            <h3 className="font-semibold">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="p-2">
            <h3 className="font-semibold text-center">{title}</h3>
          </div>
          {image ? (
            <div className={cn('relative h-48', imageClassName)}>
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
          ) : (
            Icon && (
              <div
                className={cn(
                  'flex items-center justify-center h-32 bg-muted',
                  imageClassName
                )}
              >
                <Icon
                  className={cn(
                    'h-12 w-12 text-muted-foreground',
                    iconClassName
                  )}
                />
              </div>
            )
          )}
        </>
      )}
    </Card>
  )
}

interface FormCardProps {
  options: FormItem[]
  variant?: 'default' | 'compact'
  totalSteps: number
  cardClassName?: string
  imageClassName?: string
  iconClassName?: string
}

function FormCard({
  options,
  variant = 'default',
  totalSteps,
  cardClassName,
  imageClassName,
  iconClassName,
}: FormCardProps) {
  const currentStep = useFormStore((state) => state.currentStep)
  const selections = useFormStore((state) => state.selections)
  const setSelection = useFormStore((state) => state.setSelection)
  const visualOptions = options.filter((option) => option.image || option.icon)
  const textOptions = options.filter((option) => !option.image && !option.icon)

  return (
    <div className="space-y-2">
      {visualOptions.length > 0 && (
        <div className="flex flex-wrap justify-center">
          {visualOptions.map((option) => (
            <div className="w-1/2 md:w-1/4 p-2" key={option.id}>
              <OptionCard
                title={option.title}
                description={option.description}
                icon={option.icon}
                image={option.image}
                selected={selections[currentStep] === option.id}
                onClick={() => setSelection(currentStep, option.id, totalSteps)}
                variant={variant}
                cardClassName={cardClassName}
                imageClassName={imageClassName}
                iconClassName={iconClassName}
              />
            </div>
          ))}
        </div>
      )}

      {textOptions.length > 0 && (
        <div className="flex flex-wrap justify-center">
          {textOptions.map((option) => (
            <div className="w-full p-2" key={option.id}>
              <OptionCard
                title={option.title}
                description={option.description}
                selected={selections[currentStep] === option.id}
                onClick={() => setSelection(currentStep, option.id, totalSteps)}
                variant={variant}
                cardClassName={cardClassName}
                imageClassName={imageClassName}
                iconClassName={iconClassName}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export interface MultiStepFormProps {
  formSteps: FormStep[]
  onComplete?: (selections: Record<number, string>) => void
  className?: string
  cardClassName?: string
  imageClassName?: string
  iconClassName?: string
  title?: React.ReactNode
  variant?: 'default' | 'compact'
  ref?: React.Ref<HTMLDivElement>
}

const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>(
  (
    {
      formSteps,
      onComplete,
      className = '',
      cardClassName,
      imageClassName,
      iconClassName,
      title,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const { currentStep, setStep, selections } = useFormStore()

    const isLastStep = currentStep === formSteps.length - 1
    const canFinish = isLastStep && selections[currentStep] !== undefined

    const handleFinish = () => {
      if (canFinish) {
        onComplete?.(selections)
      }
    }

    const handleBack = () => {
      if (currentStep > 0) {
        setStep(currentStep - 1)
      }
    }

    const getStepOptions = (
      currentStep: number,
      selections: Record<number, string>
    ) => {
      const step = formSteps[currentStep]
      if (!step) return null

      if (currentStep === 0) {
        return {
          title: step.title,
          options: step.items,
        }
      }

      const previousSelection = selections[currentStep - 1]
      if (!previousSelection) return null

      const previousStep = formSteps[currentStep - 1]
      const previousOption = previousStep.items.find(
        (item) => item.id === previousSelection
      )
      if (!previousOption) return null

      const validNextSteps = previousOption.validNextSteps || []
      const availableOptions = step.items.filter((item) =>
        validNextSteps.includes(item.id)
      )

      return {
        title: step.title,
        options: availableOptions,
      }
    }

    const stepOptions = getStepOptions(currentStep, selections)

    if (!stepOptions) return null

    return (
      <div
        ref={ref}
        className={`flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 ${className}`}
        {...props}
      >
        <div className="w-full max-w-5xl">
          <Card className="w-full mx-auto p-6 shadow-lg">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10">
                  {currentStep > 0 && (
                    <Button
                      variant="link"
                      onClick={handleBack}
                      className="mr-4 p-0"
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                      Back
                    </Button>
                  )}
                </div>
                {title && <div className="flex items-center">{title}</div>}
                <div className="text-sm font-medium text-muted-foreground w-10 text-right">
                  {currentStep + 1}/{formSteps.length}
                </div>
              </div>
              <Progress
                value={((currentStep + 1) / formSteps.length) * 100}
                className="h-2"
              />
              <div className="mt-4 text-center">
                <h1 className="text-2xl font-semibold mb-2">
                  {stepOptions.title}
                </h1>
                {formSteps[currentStep]?.description && (
                  <p className="text-sm text-muted-foreground mx-auto max-w-md">
                    {formSteps[currentStep].description}
                  </p>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FormCard
                  options={stepOptions.options}
                  variant={variant}
                  totalSteps={formSteps.length}
                  cardClassName={cardClassName}
                  imageClassName={imageClassName}
                  iconClassName={iconClassName}
                />
              </motion.div>
            </AnimatePresence>

            {isLastStep && (
              <div className="flex justify-end mt-8">
                <Button onClick={handleFinish} disabled={!canFinish}>
                  Finish
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    )
  }
)

MultiStepForm.displayName = 'MultiStepForm'

export default MultiStepForm
