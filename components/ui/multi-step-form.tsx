'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeftIcon, LucideIcon } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'
import { create } from 'zustand'
import { cn } from "@/lib/utils"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface FormState {
  currentStep: number
  selections: Record<number, string>
  setStep: (step: number) => void
  setSelection: (step: number, optionId: string) => void
  resetForm: () => void
}

const useFormStore = create<FormState>((set) => ({
  currentStep: 0,
  selections: {},
  setStep: (step) => set({ currentStep: step }),
  setSelection: (step, optionId) =>
    set((state) => ({
      selections: { ...state.selections, [step]: optionId },
      currentStep: step < 2 ? step + 1 : state.currentStep,
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
}

function OptionCard({
  title,
  description,
  icon: Icon,
  image,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary",
        selected && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      {image ? (
        <div className="relative h-32">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
          {Icon && <Icon className="absolute bottom-3 left-3 h-6 w-6 text-white" />}
        </div>
      ) : (
        Icon && (
          <div className="flex items-center justify-center h-32 bg-muted">
            <Icon className="h-12 w-12 text-muted-foreground" />
          </div>
        )
      )}
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </Card>
  )
}

interface FormCardProps {
  options: FormItem[]
}

function FormCard({ options }: FormCardProps) {
  const currentStep = useFormStore((state) => state.currentStep)
  const selections = useFormStore((state) => state.selections)
  const setSelection = useFormStore((state) => state.setSelection)

  const visualOptions = options.filter(option => option.image || option.icon)
  const textOptions = options.filter(option => !option.image && !option.icon)

  return (
    <div className="space-y-2">
      {visualOptions.length > 0 && (
        <div className="flex flex-wrap justify-center">
          {visualOptions.map((option) => (
            <div 
              className={cn("w-1/2 md:w-1/4 p-2")}
              key={option.id}
            >
              <OptionCard
                title={option.title}
                description={option.description}
                icon={option.icon}
                image={option.image}
                selected={selections[currentStep] === option.id}
                onClick={() => setSelection(currentStep, option.id)}
              />
            </div>
          ))}
        </div>
      )}
      
      {textOptions.length > 0 && (
        <div className="flex flex-wrap justify-center">
          {textOptions.map((option) => (
            <div 
              className={cn("w-full md:w-1/2 p-2")}
              key={option.id}
            >
              <OptionCard
                title={option.title}
                description={option.description}
                selected={selections[currentStep] === option.id}
                onClick={() => setSelection(currentStep, option.id)}
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
  title?: React.ReactNode
  ref?: React.Ref<HTMLDivElement>
}

const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>(
  ({ formSteps, onComplete, className = '', title, ...props }, ref) => {
    const { 
      currentStep,
      setStep,
      selections
    } = useFormStore()

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

    const getStepOptions = (currentStep: number, selections: Record<number, string>) => {
      const step = formSteps[currentStep]
      if (!step) return null

      if (currentStep === 0) {
        return {
          title: step.title,
          options: step.items
        }
      }

      const previousSelection = selections[currentStep - 1]
      if (!previousSelection) return null

      const previousStep = formSteps[currentStep - 1]
      const previousOption = previousStep.items.find(item => item.id === previousSelection)
      if (!previousOption) return null

      const validNextSteps = previousOption.validNextSteps || []
      const availableOptions = step.items.filter(item => 
        validNextSteps.includes(item.id)
      )

      return {
        title: step.title,
        options: availableOptions
      }
    }

    const stepOptions = getStepOptions(currentStep, selections)

    if (!stepOptions) return null

    return (
      <div ref={ref} className={`flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 ${className}`} {...props}>
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
                {title && (
                  <div className="flex items-center">
                    {title}
                  </div>
                )}
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
                <FormCard options={stepOptions.options} />
              </motion.div>
            </AnimatePresence>

            {isLastStep && (
              <div className="flex justify-end mt-8">
                <Button 
                  onClick={handleFinish} 
                  disabled={!canFinish}
                >
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
