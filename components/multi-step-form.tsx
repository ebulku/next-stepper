'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { StepOptions, useFormStore } from '@/lib/store'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'

type FormStep = {
  level: number
  id: string
  title: string
  items: FormItem[]
}

type FormItem = {
  id: string
  title: string
  description: string
  icon: any
  image: string
  validNextSteps?: string[]
}

interface OptionCardProps {
  title: string
  description: string
  icon: LucideIcon
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
        <Icon className="absolute bottom-3 left-3 h-6 w-6 text-white" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  )
}

interface FormCardProps {
  title: string
  options: FormItem[]
  currentStep: number
  totalSteps: number
}

function FormCard({ options }: FormCardProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {options.map((option) => (
        <OptionCard
          key={option.id}
          title={option.title}
          description={option.description}
          icon={option.icon}
          image={option.image}
          selected={useFormStore.getState().selections[useFormStore.getState().currentStep] === option.id}
          onClick={() => useFormStore.getState().setSelection(useFormStore.getState().currentStep, option.id)}
        />
      ))}
    </div>
  )
}

type MultiStepFormProps = {
  formSteps: FormStep[]
}

export function MultiStepForm({ formSteps }: MultiStepFormProps) {
  const { currentStep, setStep, selections, autoProgress, setAutoProgress } =
    useFormStore()

  const canProceed = selections[currentStep] !== undefined

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setStep(currentStep - 1)
    }
  }

  // Helper function to get available options for current step based on previous selections
  const getStepOptions = (currentStep: number, selections: Record<number, string>): StepOptions | null => {
    const step = formSteps[currentStep]
    if (!step) return null

    // For first step, return all options
    if (currentStep === 0) {
      return {
        title: step.title,
        options: step.items.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          icon: item.icon,
          image: item.image,
          validNextSteps: item.validNextSteps
        }))
      }
    }

    // For subsequent steps, filter based on previous selection
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
      options: availableOptions.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        icon: item.icon,
        image: item.image,
        validNextSteps: item.validNextSteps
      }))
    }
  }

  const stepOptions = getStepOptions(currentStep, selections)

  if (!stepOptions) return null

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card className="w-full max-w-4xl mx-auto p-6 shadow-lg">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">
                {stepOptions.title}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Auto-progress
                </span>
                <Switch
                  checked={autoProgress}
                  onCheckedChange={setAutoProgress}
                />
              </div>
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
              <FormCard
                title={stepOptions.title}
                options={stepOptions.options}
                currentStep={currentStep}
                totalSteps={formSteps.length}
              />
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
              {currentStep === formSteps.length - 1 ? 'Finish' : 'Next'}
              {currentStep !== formSteps.length - 1 && (
                <ArrowRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
