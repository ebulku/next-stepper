'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { useFormStore } from '@/lib/store'

import { StepOne } from '@/components/steps/step-one'
import { StepThree } from '@/components/steps/step-three'
import { StepTwo } from '@/components/steps/step-two'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'

export function MultiStepForm() {
  const { currentStep, setStep, selections, autoProgress, setAutoProgress } =
    useFormStore()
  const totalSteps = 3

  const canProceed = selections[currentStep] !== undefined

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setStep(currentStep - 1)
    }
  }

  const steps = [
    <StepOne key="step1" />,
    <StepTwo key="step2" />,
    <StepThree key="step3" />,
  ]

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <Card className="w-full max-w-4xl mx-auto p-6 shadow-lg">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">
              {currentStep === 0 && 'Select Your Project Type'}
              {currentStep === 1 && 'Choose Your Framework'}
              {currentStep === 2 && 'Pick Your Deployment'}
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
            value={((currentStep + 1) / totalSteps) * 100}
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
            {steps[currentStep]}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleNext} disabled={!canProceed}>
            {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
            {currentStep !== totalSteps - 1 && (
              <ArrowRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}
