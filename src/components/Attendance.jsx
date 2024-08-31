'use client'
import { useRef, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Attendance() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null); // Define canvasRef using useRef
  const streamRef = useRef(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isWebcamActive, setIsWebcamActive] = useState(false); // Track if the webcam is active

  const startWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream; // Store the stream to stop it later
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsWebcamActive(true); // Set webcam as active
        }
      })
      .catch((err) => console.error("Error accessing webcam: ", err));

    // Retrieve geographic location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.error("Error retrieving location: ", error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop()); // Stop all tracks of the stream
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null; // Remove the video source
      setIsWebcamActive(false); // Set webcam as inactive
    }
  };

  const toggleWebcam = () => {
    if (isWebcamActive) {
      stopWebcam();
    } else {
      startWebcam();
    }
  };

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      videoRef.current.addEventListener("play", () => {
        const draw = () => {
          context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          requestAnimationFrame(draw);
        };
        draw();
      });
    }
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Webcam Attendance</CardTitle>
        <CardDescription>Use your webcam to mark your attendance. Click 'Start' to begin.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2 text-center">
          <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
            <video
              ref={videoRef}
              className="object-cover w-full h-full"
              width="400"
              height="300"
            />
            <canvas
              ref={canvasRef} // Attach the canvasRef here
              className="absolute inset-0"
              width="400"
              height="300"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <CameraIcon className="w-12 h-12 text-muted-foreground/50" />
            </div>
          </div>
          <Button onClick={toggleWebcam}>
            {isWebcamActive ? "Stop" : "Start"} {/* Toggle button label */}
          </Button>
        </div>
        <div className="grid gap-2 text-center">
          <div className="flex items-center justify-center gap-2 text-green-500">
            <CircleCheckIcon className="w-6 h-6" />
            <span>Attendance marked successfully!</span>
          </div>
          <Button variant="outline">Retry</Button>
        </div>
        <div className="text-center">
          {location.latitude && location.longitude ? (
            <p>
              Location: Latitude: {location.latitude}<br></br> Longitude: {location.longitude}
            </p>
          ) : (
            <p>Location: Not available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CameraIcon(props) {
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
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function CircleCheckIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
