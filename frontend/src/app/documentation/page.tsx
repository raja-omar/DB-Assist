'use client'

import { ArrowDownCircle } from 'lucide-react'
import { Sidebar } from '@/components/doc-sidebar-right'
import { useRef } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const navItems = [
    { label: 'Overview', id: 'overview' },
    { label: 'Key Entities and Roles', id: 'keyents' },
    { label: 'Schema Visualization', id: 'schema' },
    { label: 'Section 4', id: 'section3' },
    { label: 'Section 5', id: 'section4' },
]

export default function Documentation() {
    const sectionRefs = useRef<(HTMLElement | null)[]>([])

    const scrollToNextSection = (currentIndex: number) => {
        if (currentIndex < sectionRefs.current.length - 1) {
            sectionRefs.current[currentIndex + 1]?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const entities = [
        {
            name: "Students",
            attributes: ["ID", "Name", "Date of Birth", "Enrollment Date", "Email", "Major"],
            purpose: "Represents individuals enrolled in the university. Tracks their demographic and academic information.",
            relationships: ["Enrollments"]
        },
        {
            name: "Courses",
            attributes: ["ID", "Name", "Credits", "Department", "Category"],
            purpose: "Represents academic subjects offered at the university. Includes details about credit value and associated departments.",
            relationships: ["Enrollments", "Schedules", "Departments", "Categories"]
        },
        {
            name: "Departments",
            attributes: ["ID", "Name", "Faculty Head"],
            purpose: "Represents the organizational units within the university that oversee courses and faculty.",
            relationships: ["Courses", "Faculty"]
        },
        {
            name: "Faculty",
            attributes: ["ID", "Name", "Title", "DepartmentID", "Email"],
            purpose: "Represents teaching and administrative staff within the university.",
            relationships: ["Departments"]
        },
    ]

    return (
        <div className="flex">
            <div className="fixed top-4 left-4 z-10 flex flex-col space-y-4">
                <Link href="/chat">
                    <Button className="w-full ">🡸 Back to Chatbot</Button>
                </Link>
            </div>
            <main className="flex-1 flex flex-col pr-16"> 
                <section
                    id="overview"
                    ref={el => sectionRefs.current[0] = el}
                    className="min-h-screen flex flex-col items-center bg-gray-100 p-8"
                >
                    <h2 className="text-4xl font-bold mb-8  mt-8">Overview</h2>
                    <p className="text-xl text-center max-w-2xl">
                        This database is designed to model and manage the operations of a university, covering a variety of entities and relationships crucial to academic and administrative processes.
                        It captures critical data about students, courses, faculty, departments, classrooms, and scheduling to support seamless academic planning and execution.
                        By integrating information about enrollments, course categories, faculty assignments, and classroom allocations, the database enables efficient management of student records,
                        curriculum requirements, and resource usage. Below is an overview of the key entities, their relationships, and their purpose:
                    </p>
                    <button
                        onClick={() => scrollToNextSection(0)}
                        className="mt-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        aria-label="Scroll to Schema Visualization section"
                    >
                        <ArrowDownCircle className="animate-bounce" size={32} />
                    </button>
                </section>

                <section
                    id="keyents"
                    ref={el => sectionRefs.current[1] = el}
                    className="min-h-screen flex flex-col items-center bg-gray-100 p-8"
                >
                    <h2 className="text-4xl font-bold mb-16 mt-8">Key Entities and Roles</h2>
                    <div className="mx-24 pr-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {entities.map((entity) => (
                                <Card key={entity.name} className="shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold">{entity.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-4">
                                            <h3 className="font-semibold mb-2">Attributes:</h3>
                                            <ul className="list-disc list-inside">
                                                {entity.attributes.map((attr) => (
                                                    <li key={attr} className="text-sm">{attr}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mb-4">
                                            <h3 className="font-semibold mb-2">Purpose:</h3>
                                            <p className="text-sm">{entity.purpose}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2">Relationships:</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {entity.relationships.map((rel) => (
                                                    <Badge key={rel} variant="secondary">{rel}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => scrollToNextSection(1)}
                        className="mt-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        aria-label="Scroll to Schema Visualization section"
                    >
                        <ArrowDownCircle className="animate-bounce" size={32} />
                    </button>
                </section>

                <section
                    id="schema"
                    ref={el => sectionRefs.current[2] = el}
                    className="min-h-screen flex flex-col items-center bg-white p-8"
                >
                    <h2 className="text-4xl font-bold mb-8 mt-8">Schema Visualization</h2>
                    <div className="w-full max-w-2xl h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-xl text-gray-500">Schema Diagram Placeholder</p>
                    </div>
                    <p className="mt-4 text-xl text-center max-w-2xl">
                        This is a visual representation of your schema.
                    </p>
                    <button
                        onClick={() => scrollToNextSection(2)}
                        className="mt-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        aria-label="Scroll to Section 3"
                    >
                        <ArrowDownCircle className="animate-bounce" size={32} />
                    </button>
                </section>

                <section
                    id="section3"
                    ref={el => sectionRefs.current[3] = el}
                    className="min-h-screen flex flex-col items-center bg-gray-100 p-8"
                >
                    <h2 className="text-4xl font-bold mb-4 mt-8">Section 4</h2>
                    <p className="text-xl text-center max-w-2xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <button
                        onClick={() => scrollToNextSection(3)}
                        className="mt-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        aria-label="Scroll to Schema Visualization section"
                    >
                        <ArrowDownCircle className="animate-bounce" size={32} />
                    </button>
                </section>

                <section
                    id="section4"
                    ref={el => sectionRefs.current[4] = el}
                    className="min-h-screen flex flex-col items-center bg-gray-100 p-8"
                >
                    <h2 className="text-4xl font-bold mb-4 mt-8">Section 5</h2>
                    <p className="text-xl text-center max-w-2xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </section>
            </main>
            <Sidebar items={navItems} />
        </div>
    )
}

