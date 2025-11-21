import { useState } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Vite + React + shadcn/ui
          </h1>
          <p className="text-muted-foreground text-lg">
            Modern React application with shadcn/ui components
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-2xl font-semibold mb-4">Counter Example</p>
              <div className="text-6xl font-bold text-primary mb-6">
                {count}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={() => setCount((count) => count + 1)}
                variant="default"
              >
                Increment
              </Button>
              <Button 
                onClick={() => setCount((count) => count - 1)}
                variant="outline"
              >
                Decrement
              </Button>
              <Button 
                onClick={() => setCount(0)}
                variant="secondary"
              >
                Reset
              </Button>
              <Button 
                onClick={() => setCount((count) => count + 10)}
                variant="ghost"
              >
                +10
              </Button>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Built with Vite, React, Tailwind CSS, and shadcn/ui
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
