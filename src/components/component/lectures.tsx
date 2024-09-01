'use client';
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';
const supabaseUrl = 'https://ymjsanlykbfwjrxbvzej.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltanNhbmx5a2Jmd2pyeGJ2emVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwNDU4NzcsImV4cCI6MjA0MDYyMTg3N30.wjk5gH-BJpazZeABuiXxUY8C2WIbRgh8C3soTIq7I0M';
const supabase = createClient(supabaseUrl, supabaseKey);

export function Lectures() {
   
  const path = usePathname()
  const dat = path.split('/')[1]

  // await supabase.from('Lectures').select('*')

 
  
  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
      <h1 className='text-3xl font-bold mb-6 ml-2'>Lectures</h1>
      <div className="space-y-6">
        <div className="grid gap-4">
          {lecturesData.map((lecture, index) => (
            <div key={index} className="bg-background rounded-lg border shadow-sm overflow-hidden">
              <div className="p-4 md:p-6 space-y-2">
                <h3 className="text-lg font-medium">{lecture.title}</h3>
                <p className="text-muted-foreground">{lecture.description}</p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Lecturer: {lecture.lecturer}</span>
                  <span>•</span>
                  <span>{lecture.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const lecturesData = [
  {
    title: "Introduction to Computer Science",
    description: "Explore the fundamental concepts of computer science, including algorithms, data structures, and programming languages.",
    lecturer: "John Doe",
    date: "September 1, 2023 - 9:00 AM",
  },
  {
    title: "Data Structures and Algorithms",
    description: "Learn about the fundamental data structures and algorithms used in computer science, and how to implement them efficiently.",
    lecturer: "Jane Smith",
    date: "September 8, 2023 - 2:00 PM",
  },
  {
    title: "Introduction to Web Development",
    description: "Explore the basics of web development, including HTML, CSS, and JavaScript, and how to build interactive web applications.",
    lecturer: "Michael Johnson",
    date: "September 15, 2023 - 11:00 AM",
  },
  {
    title: "Database Systems",
    description: "Explore the fundamental concepts of database systems, including data modeling, SQL, and database management.",
    lecturer: "Emily Chen",
    date: "September 22, 2023 - 4:00 PM",
  },
];
