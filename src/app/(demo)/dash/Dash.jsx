'use state'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { UserButton, useUser } from "@clerk/nextjs"

export default function Dash() {
    
    

  return (
    <div className="bg-background rounded-lg border p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* <img
            src="/placeholder.svg"
            width="48"
            height="48"
            className="rounded-full"
            alt="Student Avatar"
            style={{ aspectRatio: "48/48", objectFit: "cover" }}
          /> */}
          <UserButton></UserButton>
          <div>
            <h1 className="text-2xl font-bold">Uma Mahesh</h1>
            <p className="text-muted-foreground">Student</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">78%</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">9.8 GPA</div>
            <p className="text-muted-foreground text-sm mt-1">Average grade across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Time Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">42 hrs</div>
            <p className="text-muted-foreground text-sm mt-1">Total study time this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12/15</div>
            <p className="text-muted-foreground text-sm mt-1">Completed assignments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Research Paper</p>
                <p className="text-muted-foreground text-xs">Due in 3 days</p>
              </div>
              <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Math Exam</p>
                <p className="text-muted-foreground text-xs">Due in 7 days</p>
              </div>
              <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Midterm Exam</div>
                    <div className="text-muted-foreground text-sm">Completed</div>
                  </TableCell>
                  <TableCell>
                    <time dateTime="2023-04-15">April 15, 2023</time>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">85%</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Research Paper</div>
                    <div className="text-muted-foreground text-sm">Submitted</div>
                  </TableCell>
                  <TableCell>
                    <time dateTime="2023-03-30">March 30, 2023</time>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">92%</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Math Quiz</div>
                    <div className="text-muted-foreground text-sm">Completed</div>
                  </TableCell>
                  <TableCell>
                    <time dateTime="2023-02-28">February 28, 2023</time>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">78%</div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}