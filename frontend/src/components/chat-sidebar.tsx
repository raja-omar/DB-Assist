import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'

interface ChatSidebarProps {
    conversations: { id: string; title: string }[];
    currentConversation: string;
    onSelectConversation: (id: string) => void;
    onNewChat: () => void;
}

export function ChatSidebar({ conversations, currentConversation, onSelectConversation, onNewChat }: ChatSidebarProps) {
    return (
        <div className="w-64 border-r bg-secondary flex flex-col h-full">
            <div className="p-4 flex flex-col space-y-4">
                <Link href="/documentation">
                    <Button variant="outline" className="w-full">Database Documentation</Button>
                </Link>
                <Link href="/">
                    <Button variant="outline" className="w-full">Back to Main Site</Button>
                </Link>
                <Button className="w-full" onClick={onNewChat}>New Chat</Button>
            </div>
            <ScrollArea className="flex-1">
                {conversations.map((conversation) => (
                    <Button
                        key={conversation.id}
                        variant="ghost"
                        className={`w-full justify-start px-4 py-2 text-left hover:bg-primary/10 ${conversation.id === currentConversation ? "bg-primary/20" : ""
                            }`}
                        onClick={() => onSelectConversation(conversation.id)}
                    >
                        {conversation.title}
                    </Button>
                ))}
            </ScrollArea>
        </div>
    )
}

