
import { Button } from "@/components/ui/button"

export default function Alert() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center justify-center space-y-6">
          <FlameIcon className="text-red-500 w-16 h-16" />
          <h2 className="text-2xl font-bold">Fire Alarm Activated</h2>
          <p className="text-muted-foreground">Please evacuate the building immediately. This is not a drill.</p>
          <Button size="lg" className="w-full">
            Evacuate
          </Button>
        </div>
      </div>
    </div>
  )
}

function FlameIcon(props) {
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
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}