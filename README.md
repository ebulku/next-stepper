# next-stepper

A dynamic multi-step form built with **Next.js** and styled using [shadcn/ui](https://ui.shadcn.com/). This project showcases how to create smooth, step-based workflows with modern components and responsive design.

## Preview

<div align="center">
  <img src="https://api.microlink.io/?url=https%3A%2F%2Fnext-stepper.vercel.app%2F&overlay.browser=dark&overlay.background=linear-gradient%28225deg%2C+%23FF057C+0%25%2C+%238D0B93+50%25%2C+%23321575+100%25%29&screenshot=true&embed=screenshot.url" alt="Home Page" style="max-width: 100%;" >
</div>

## Features

- 🎯 Dynamic multi-step navigation with progress tracking
- 🔄 Conditional step filtering based on previous selections
- 📱 Fully responsive and mobile-friendly
- 🎨 Beautiful UI with shadcn/ui components
- ⚡ Fast and smooth transitions with Framer Motion
- 💾 Efficient state management with Zustand
- 🔍 Optional icons and images for steps
- 📋 Form completion summary

## Installation

### 1. Install Required Packages

```bash
npm install zustand framer-motion
```

### 2. Install Required shadcn/ui Components

```bash
npx shadcn-ui@latest add card button progress
```

### 3. Copy Component Files

Create a new file `components/ui/multi-step-form.tsx` and copy the component code from the repository.

## Usage

### Basic Implementation

```tsx
import MultiStepForm, { type FormStep } from '@/components/ui/multi-step-form'

const formSteps: FormStep[] = [
  {
    id: 'step-1',
    title: 'Choose Type',
    description: 'Optional step description',
    items: [
      {
        id: 'item-1',
        title: 'Option 1',
        description: 'Description for option 1',
        icon: Icon1,                    // Optional: Lucide icon
        image: '/path/to/image.jpg',    // Optional: Image URL
        validNextSteps: ['next-item-1'] // Optional: Filter next step options
      }
      // More items...
    ]
  }
  // More steps...
]

export default function FormContainer() {
  return <MultiStepForm steps={steps} />
}
```

### Complete Implementation Example

```tsx
import { Code2Icon, GlobeIcon, CodeIcon } from 'lucide-react'
import MultiStepForm from '@/components/ui/multi-step-form'
import { toast } from "sonner"

const formSteps = [
  {
    id: 'project-type',
    title: 'Select Your Project Type',
    description: 'What type of project are you working on?',
    items: [
      {
        id: 'custom',
        title: 'Custom',
        description: 'This is a Card with no image or icon',
        validNextSteps: ['nextjs', 'astro', 'remix']
      },
      {
        id: 'webapp',
        title: 'Web Application',
        description: 'This is a Card with only icon',
        icon: CodeIcon,
        validNextSteps: ['nextjs', 'remix']
      },
      {
        id: 'website',
        title: 'Website',
        description: 'Card with icon & image',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
        icon: GlobeIcon,
        validNextSteps: ['nextjs', 'astro']
      }
    ]
  },
  {
    id: 'framework',
    title: 'Choose Your Framework',
    description: 'Select a framework for your project',
    items: [
      {
        id: 'nextjs',
        title: 'Next.js',
        description: 'React framework with hybrid static & server rendering',
        icon: CodeIcon
      },
      {
        id: 'astro',
        title: 'Astro',
        description: 'Static site builder with island architecture',
        icon: GlobeIcon
      },
      {
        id: 'remix',
        title: 'Remix',
        description: 'Full stack web framework',
        icon: CodeIcon
      }
    ]
  }
]

export default function FormContainer() {
  const handleComplete = (selections: Record<number, string>) => {
    // handel form completion
  }

  return (
    <MultiStepForm
      formSteps={formSteps}
      title={
        <div className="flex items-center gap-2">
          <Code2Icon className="h-6 w-6" />
          <span className="text-xl font-semibold">Project Setup Wizard</span>
        </div>
      }
      onComplete={handleComplete}
    />
  )
}
```


## Packages

- [Next.js](https://nextjs.org/) - The leading React framework
- [shadcn/ui](https://ui.shadcn.com/) - Modern, customizable component library
- [Framer Motion](https://www.framer.com/motion/) - Powerful animations
- [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## Contributing

Contributions are welcome! Please submit an issue or pull request if you have suggestions or improvements.

## License

This project is licensed under the MIT License.
