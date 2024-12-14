import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

interface ChatMessagesProps {
  messages: Message[];
  onExampleClick: (question: string) => void;
}

export function ChatMessages({ messages, onExampleClick }: ChatMessagesProps) {
  const exampleQuestions = [
    "What is the relationship between the 'users' and 'orders' table?",
    "What is the primary key of the 'users' table?",
    "How can I optimize the performance of this SQL query?",
    "Write a SQL query to retrieve 10 most recent orders for a user.",
  ];

  return (
    <ScrollArea className="flex-1 p-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground max-w-2xl">
            <p className="text-lg font-semibold mb-2">Welcome to DBAssist AI</p>
            <p>Ask me questions about your database schema, and I'll provide insights and suggestions.</p>
            <p className="mt-4 mb-2">For example:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto text-left whitespace-normal p-4"
                  onClick={() => onExampleClick(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))
      )}
    </ScrollArea>
  )
}

