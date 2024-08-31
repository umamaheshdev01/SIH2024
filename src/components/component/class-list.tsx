'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from '@supabase/supabase-js';
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";

// Initialize Supabase client
const supabaseUrl = 'https://ymjsanlykbfwjrxbvzej.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltanNhbmx5a2Jmd2pyeGJ2emVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwNDU4NzcsImV4cCI6MjA0MDYyMTg3N30.wjk5gH-BJpazZeABuiXxUY8C2WIbRgh8C3soTIq7I0M';
const supabase = createClient(supabaseUrl, supabaseKey);

export function ClassList() {
  const navigate = useRouter()
  const { user } = useUser();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);

  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");

  async function addMember(user: any, classs: any, role = 1) {
    try {
      const { data, error } = await supabase.from('Members').insert({ user: user, classid: classs, role: role });
      if (error) throw error;
      console.log('Member added:', data);
    } catch (error) {
      console.error("Error adding member:", error);
    }
  }

  async function addAdmin(user: any, name: any) {
    try {
      // Add admin to the Classes table
      const { data: classData, error: classError } = await supabase.from('Classes').insert({ name: name, useradmin: user ,location:'ok'}).select();
      if (classError) throw classError;
      console.log('Class created:', classData);

      // Add admin to the Members table with role 1
      const { data: memberData, error: memberError } = await supabase.from('Members').insert({ user: user, classid: classData[0].id, role: 0 });
      if (memberError) throw memberError;
      console.log('Admin added to Members:', memberData);
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  }

  useEffect(() => {
    const fetchClasses = async () => {
      if (user?.username) {
        setLoading(true);
        const { data, error } = await supabase
          .from('Members')
          .select('*, Classes(*)')
          .eq('user', user.username);

        if (error) {
          console.error("Error fetching classes:", error);
          setLoading(false);
          return;
        }

        if (data) {
          const fetchedClasses = data.flatMap((member: any) => {
            return { classu: member.Classes, type: member.role };
          });
          setClasses(fetchedClasses);
          console.log(fetchedClasses);
        }
        setLoading(false);
      }
    };

    fetchClasses();
  }, [user]);

  const handleCreateClass = async () => {
    await addAdmin(user?.username, className);
    setCreateModalOpen(false);
    navigate.replace('/dashboard')
  };

  const handleJoinClass = async () => {
    await addMember(user?.username, classCode);
    setJoinModalOpen(false);
    navigate.replace('/dashboard')
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6">
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
    <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          <Button className="ml-2" onClick={() => setJoinModalOpen(true)}>Join</Button>
          <Button variant="secondary" onClick={() => setCreateModalOpen(true)}>Create</Button>
        </div>
        <div className="text-muted-foreground text-sm">
          Showing {classes.length} of {classes.length} classes
        </div>
      </div>

      {/* Modal for creating a class */}
      <Dialog open={isCreateModalOpen} onClose={() => setCreateModalOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <Dialog.Title className="text-xl font-semibold text-center">Create Class</Dialog.Title>
            <div className="mt-4">
              <label htmlFor="className" className="block text-sm font-medium text-gray-700">Class Name</label>
              <input
                id="className"
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="secondary" onClick={() => setCreateModalOpen(false)}>Cancel</Button>
              <Button className="ml-2" onClick={handleCreateClass}>Create</Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal for joining a class */}
      <Dialog open={isJoinModalOpen} onClose={() => setJoinModalOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <Dialog.Title className="text-xl font-semibold text-center">Join Class</Dialog.Title>
            <div className="mt-4">
              <label htmlFor="classCode" className="block text-sm font-medium text-gray-700">Class Code</label>
              <input
                id="classCode"
                type="text"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="secondary" onClick={() => setJoinModalOpen(false)}>Cancel</Button>
              <Button className="ml-2" onClick={handleJoinClass}>Join</Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Link href={`/${classItem.classu.id}`} key={classItem.classu.id}>
            
              <Card className="p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-muted-foreground">#{classItem.classu.id}</span>
                  <div className={`bg-${classItem.type === 0 ? 'primary' : classItem.type === 1 ? 'secondary' : 'muted'} text-${classItem.type === 0 ? 'primary-foreground' : classItem.type === 1 ? 'secondary-foreground' : 'muted-foreground'} px-2 py-1 rounded-md text-xs font-medium`}>
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
