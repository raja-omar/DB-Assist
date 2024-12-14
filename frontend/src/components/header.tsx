import Link from 'next/link'

export function Header() {
  return (
    <header className="py-4 px-6 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          DBAssist AI
        </Link>
      </div>
    </header>
  )
}

