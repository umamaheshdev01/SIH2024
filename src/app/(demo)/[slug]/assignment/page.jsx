"use client"
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ymjsanlykbfwjrxbvzej.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltanNhbmx5a2Jmd2pyeGJ2emVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwNDU4NzcsImV4cCI6MjA0MDYyMTg3N30.wjk5gH-BJpazZeABuiXxUY8C2WIbRgh8C3soTIq7I0M";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Component() {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [submissionContent, setSubmissionContent] = useState("");

  useEffect(() => {
    async function fetchAssignmentsAndSubmissions() {
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from("Assignments")
        .select("*");

      if (assignmentsError) {
        console.error("Error fetching assignments:", assignmentsError);
      } else {
        setAssignments(assignmentsData);
      }

      // Assuming current user's ID is available (replace with actual logic to get user ID)
      const userId = 1; // Replace with actual user ID

      const { data: submissionsData, error: submissionsError } = await supabase
        .from("Submissions")
        .select("*")
        .eq("created_by", userId);

      if (submissionsError) {
        console.error("Error fetching submissions:", submissionsError);
      } else {
        const submissionsMap = {};
        submissionsData.forEach((submission) => {
          submissionsMap[submission.assignment_id] = submission;
        });
        setSubmissions(submissionsMap);
      }
    }

    fetchAssignmentsAndSubmissions();
  }, []);

  const handleSubmission = async (assignmentId) => {
    if (submissionContent.trim()) {
      const { data, error } = await supabase
        .from("Submissions")
        .insert([
          {
            assignment_id: assignmentId,
            content: submissionContent,
            created_by: 1,  // Replace with actual user ID
            status: true,
          },
        ]);

      if (error) {
        console.error("Error submitting assignment:", error);
      } else {
        alert("Submission successful!");
        setSubmissions({
          ...submissions,
          [assignmentId]: { assignment_id: assignmentId, status: true },
        });
        setSubmissionContent("");  // Clear the input after submission
      }
    } else {
      alert("Please fill in the submission content.");
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Assignments</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Browse through the assignments and submit your work.
          </p>
        </div>
        <div className="grid gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => {
            const submission = submissions[assignment.id];
            const isSubmitted = submission && submission.status;

            return (
              <div key={assignment.id} className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="p-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <h3 className="text-xl font-semibold">Assignment {assignment.id}</h3>
                  <p className="text-muted-foreground">{assignment.content}</p>
                  <p className="text-muted-foreground">Deadline: {new Date(assignment.deadline).toLocaleString()}</p>

                  {isSubmitted ? (
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                      Submitted
                    </button>
                  ) : (
                    <>
                      <textarea
                        className="w-full mt-4 p-2 border rounded"
                        rows="4"
                        placeholder="Enter your submission content..."
                        value={submissionContent}
                        onChange={(e) => setSubmissionContent(e.target.value)}
                      />
                      <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => handleSubmission(assignment.id)}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}