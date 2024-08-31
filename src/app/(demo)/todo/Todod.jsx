"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export default function Todod() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finish English essay",
      dueDate: "2024-09-15",
      priority: "high",
      completed: false,
      assignedTo: "student",
    },
    {
      id: 2,
      title: "Study for Math test",
      dueDate: "2024-09-20",
      priority: "upcoming",
      completed: false,
      assignedTo: "student",
    },
    {
      id: 3,
      title: "Grade student presentations",
      dueDate: "2024-09-10",
      priority: "high",
      completed: false,
      assignedTo: "teacher",
    },
    {
      id: 4,
      title: "Prepare lesson plan for History",
      dueDate: "2024-09-18",
      priority: "upcoming",
      completed: false,
      assignedTo: "teacher",
    },
  ])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const dueDate = new Date(task.dueDate)
      return dueDate.getMonth() === selectedDate.getMonth() && dueDate.getFullYear() === selectedDate.getFullYear()
    })
  }, [tasks, selectedDate])
  const handleTaskCreate = (task) => {
    setTasks([...tasks, task])
  }
  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task)))
  }
  const handleTaskComplete = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }
  return (
    <div className="flex flex-col h-full">
      {/* <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">To-Do List</h1>
        <Button
          variant="secondary"
          onClick={() =>
            handleTaskCreate({
              id: tasks.length + 1,
              title: "",
              dueDate: "",
              priority: "upcoming",
              completed: false,
              assignedTo: "student",
            })
          }
        >
          + Add Task
        </Button>
      </header> */}
      <div className="flex-1 grid grid-cols-[1fr_2fr] gap-4 p-6">
        {/* <div className="bg-background rounded-lg shadow-lg p-4">
         
        </div> */}
        <div className="bg-background rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              Tasks for{" "}
              {selectedDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <FilterIcon className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>High Priority</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Upcoming</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Overdue</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Completed</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid gap-4">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="p-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox checked={task.completed} onCheckedChange={() => handleTaskComplete(task.id)} />
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                    </div>
                    <Badge
                      variant={
                        task.priority === "high" ? "danger" : task.priority === "upcoming" ? "warning" : "success"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                    <div className="text-muted-foreground">Assigned to: {task.assignedTo}</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleTaskUpdate({
                        id: task.id,
                        title: "Updated task title",
                        dueDate: "2024-09-25",
                        priority: "high",
                        completed: false,
                        assignedTo: "student",
                      })
                    }
                  >
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}