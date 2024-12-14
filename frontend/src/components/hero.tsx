import { ConnectionModal } from '@/components/connection-modal'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Supercharge Your Onboarding</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          DBAssist AI is your intelligent companion for all things database!.
              </p>
              <div className="container mx-auto py-8">
                  <ConnectionModal
                      trigger={
                          <Button>Get Started</Button>
                      }
                  />
              </div>
      </div>
    </section>
  )
}

