# next-stepper

A dynamic multi-step form built with **Next.js** and styled using [shadcn/ui](https://ui.shadcn.com/). This project showcases how to create smooth, step-based workflows with modern components and responsive design.

## Preview

<div align="center">
  <img src="https://api.microlink.io/?url=https://next-stepper.vercel.app/extended&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&overlay.browser=dark&overlay.background=linear-gradient%28225deg%2C+%23FF057C+0%25%2C+%238D0B93+50%25%2C+%23321575+100%25%29" alt="Home Page" style="max-width: 100%;" >
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

Check out our live interactive demo to see the form in action, and explore our comprehensive implementation example in the extended form component.

[Demo](https://next-stepper.vercel.app/extended) | [extended-form.tsx](components/extended-form.tsx)

## Packages

- [Next.js](https://nextjs.org/) - The leading React framework
- [shadcn/ui](https://ui.shadcn.com/) - Modern, customizable component library
- [Framer Motion](https://www.framer.com/motion/) - Powerful animations
- [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## TODO
- [x] Demo implementation
- [x] Add compact pre-built template
- [x] Add an optional form completion summary
- [x] Add optional custom form input in the end step
- [ ] Add optional multi-step form with different imput types
- [ ] Implement form validation schemas
- [ ] Add more customization options for step cards
- [ ] Create more pre-built templates
- [ ] Support for dynamic step generation

## Contributing

Contributions are welcome! Please submit an issue or pull request if you have suggestions or improvements.

## License

This project is licensed under the MIT License.
