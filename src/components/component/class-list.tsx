'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from '@supabase/supabase-js';
import { useUser } from "@clerk/nextjs";
import Link from "next/link";


// Initialize Supabase client
const supabaseUrl = 'https://ymjsanlykbfwjrxbvzej.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltanNhbmx5a2Jmd2pyeGJ2emVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwNDU4NzcsImV4cCI6MjA0MDYyMTg3N30.wjk5gH-BJpazZeABuiXxUY8C2WIbRgh8C3soTIq7I0M';
const supabase = createClient(supabaseUrl, supabaseKey);

export function ClassList() {
  const { user } = useUser();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state


  useEffect(() => {
    const fetchClasses = async () => {
      if (user?.username) {
        setLoading(true);
        const { data, error } = await supabase
          .from('Members')
          .select('*, Classes(*)')
          .eq('user', user.username);

        if (error) {
          console.error("Error fetching classes: ", error);
          setLoading(false); // Set loading to false if there is an error
          return;
        }

        if (data) {
          const fetchedClasses = data.flatMap((member: any) => { return { classu: member.Classes, type: member.role } });
          setClasses(fetchedClasses);
          console.log(fetchedClasses);

        }
        setLoading(false);
      }
    };

    fetchClasses();
  }, [user]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6 ">
        <br>
        </br>
        <br></br>
        <br>
        </br>
        <br></br>
        <br>
        </br>
        <br></br>
        <div className="text-center text-muted-foreground">Loading classes...</div>
      </div>
    );
  }

  const getClassTypeLabel = (type: number) => {
    switch (type) {
      case 0:
        return "Admin";
      case 1:
        return "Student";
      case 2:
        return "Teacher";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="w-full py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <Button>Join</Button>
          <Button variant="secondary">Create</Button>
        </div>
        <div className="text-muted-foreground text-sm">
          Showing {classes.length} of {classes.length} classes
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Link href={`/${classItem.classu.id}`} key={classItem.classu.id}>
            <Card className="p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-muted-foreground">#{classItem.classu.id}</span>
                <div
                  className={`bg-${classItem.type === 0 ? 'primary' : classItem.type === 1 ? 'secondary' : 'muted'} text-${classItem.type === 0 ? 'primary-foreground' : classItem.type === 1 ? 'secondary-foreground' : 'muted-foreground'} px-2 py-1 rounded-md text-xs font-medium`}
                >
                  {getClassTypeLabel(classItem.type)}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{classItem.classu.name}</h3>
              <p className="text-muted-foreground text-sm">
                {classItem.classu.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
  

}
