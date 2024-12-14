import { CheckCircle, Zap, LineChart, Lock } from 'lucide-react'

const features = [
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: 'Smart Query Optimization',
    description: 'Automatically optimize your database queries for better performance.'
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: 'Intelligent Indexing',
    description: 'Suggest and create optimal indexes to speed up your queries.'
  },
  {
    icon: <LineChart className="h-6 w-6 text-primary" />,
    title: 'Performance Analytics',
    description: 'Get in-depth insights into your database performance and usage patterns.'
  },
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    title: 'Security Recommendations',
    description: 'Receive AI-powered suggestions to enhance your database security.'
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

