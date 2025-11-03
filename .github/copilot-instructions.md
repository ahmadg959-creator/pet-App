# AI Agent Instructions for PetCare Connect

## Project Overview
PetCare Connect is a React-based web application for pet management with a focus on authentication flows and pet profile management. The application follows a component-based architecture with clear separation between authentication and main application features.

## Key Architecture Components

### Authentication Flow (`/src/components/Auth/`)
- Multi-step authentication process managed by `AuthFlow.jsx`
- Steps: Welcome → Login → Add Pet Wizard
- State management using React hooks within components
- Example usage in `AuthFlow.jsx`:
```jsx
const [step, setStep] = useState('welcome');
const handleLoginComplete = (data) => {
  setUserData(data);
  setStep('add-pet');
};
```

### Main Application (`/src/components/MainApp/`)
- Page-based navigation using state management
- Components: HomePage, MyPetsPage, VetDocPage, etc.
- Shared Header/Footer components
- Data passed through props from App.jsx

## State Management Pattern
- Local state management using React hooks
- Top-level state in `App.jsx` for auth and pets data
- Component-level state for UI interactions
- No global state management library used

## Styling Conventions
- Tailwind CSS for utility-first styling
- Custom CSS in `index.css` for animations and transitions
- Mobile-first responsive design
- Custom color theme defined in `tailwind.config.js`

## Common Development Workflows

### Starting Development
```bash
cd "d:\pet app"
npm run dev
```
- Runs on http://localhost:3000 (or next available port)

### Component Structure
New components should follow existing patterns:
```jsx
const ComponentName = ({ prop1, prop2 }) => {
  // State hooks at the top
  const [state, setState] = useState(initial);
  
  // Event handlers next
  const handleEvent = () => {
    // Logic here
  };

  // Render last
  return (
    <div className="[tailwind-classes]">
      {/* Content */}
    </div>
  );
};
```

## Error Handling
- Error boundary at the app root (`ErrorBoundary.jsx`)
- Try-catch blocks in data operations
- Validation in form submissions
- Console logging for development debugging

## Key Integration Points
1. Authentication completion:
```jsx
onAuthComplete({ ...userData, pets: [petData] });
```

2. Page navigation:
```jsx
setCurrentPage('page-name');
```

3. Pet data updates:
```jsx
setPets([...pets, newPet]);
```

## Responsive Design Breakpoints
- Mobile: Base styles
- Tablet: sm: (640px+)
- Desktop: lg: (1024px+)

Example:
```jsx
className="p-4 sm:p-6 lg:p-8"
```

## Code Conventions
- Functional components with hooks
- Props destructuring in component parameters
- Event handlers prefixed with 'handle'
- Consistent class naming: page-specific containers suffixed with '-view'
- CSS animations defined in index.css

## Testing Guidelines
- Not yet implemented - consult team before adding tests