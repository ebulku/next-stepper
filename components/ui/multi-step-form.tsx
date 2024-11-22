'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, LucideIcon } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'
import { create } from 'zustand'

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
  items: FormItem[]
}

export type FormItem = {
  id: string
  title: string
  description?: string
  icon?: LucideIcon
  image: string
  validNextSteps?: string[]
}

interface OptionCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  image: string
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
      className={`relative overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary ${
        selected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
    >
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

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {options.map((option) => (
        <OptionCard
          key={option.id}
          title={option.title}
          description={option.description}
          icon={option.icon}
          image={option.image}
          selected={selections[currentStep] === option.id}
          onClick={() => setSelection(currentStep, option.id)}
        />
      ))}
    </div>
  )
}

export interface MultiStepFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formSteps: FormStep[]
  onComplete?: (selections: Record<number, string>) => void
  className?: string
}

const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>(
  ({ formSteps, onComplete, className, ...props }, ref) => {
    const { 
      currentStep,
      setStep,
      selections
    } = useFormStore()

    const canProceed = selections[currentStep] !== undefined
    const isLastStep = currentStep === formSteps.length - 1

    const handleNext = () => {
      if (isLastStep) {
        onComplete?.(selections)
      } else if (currentStep < formSteps.length - 1) {
        setStep(currentStep + 1)
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
        <div className="w-full max-w-md">
          <Card className="w-full max-w-4xl mx-auto p-6 shadow-lg">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">
                  {stepOptions.title}
                </h1>
              </div>
              <Progress
                value={((currentStep + 1) / formSteps.length) * 100}
                className="h-2"
              />
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

            <div className="flex justify-between mt-8">
              <Button
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext} disabled={!canProceed}>
                {isLastStep ? 'Finish' : 'Next'}
                {!isLastStep && (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }
)

MultiStepForm.displayName = 'MultiStepForm'

export default MultiStepForm
