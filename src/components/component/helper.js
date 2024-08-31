import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ymjsanlykbfwjrxbvzej.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltanNhbmx5a2Jmd2pyeGJ2emVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwNDU4NzcsImV4cCI6MjA0MDYyMTg3N30.wjk5gH-BJpazZeABuiXxUY8C2WIbRgh8C3soTIq7I0M';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function addMember(user, classs, role = 1) {
    try {
        const { data, error } = await supabase.from('Members').insert({ user: user, classid: classs, role: role });
        if (error) throw error;
        console.log('Member added:', data);
    } catch (error) {
        console.error('Error adding member:', error.message);
    }
}

export async function addAdmin(user, name) {
    try {
        // Add admin to the Classes table
        const { data: classData, error: classError } = await supabase.from('Classes').insert({ name: name, useradmin: user }).select();
        if (classError) throw classError;
        console.log('Class created:', classData);

        // Add admin to the Members table with role 1
        const { data: memberData, error: memberError } = await supabase.from('Members').insert({ user: user, classid: classData[0].id, role: 0 });
        if (memberError) throw memberError;
        console.log('Admin added to Members:', memberData);
    } catch (error) {
        console.error('Error adding admin:', error.message);
    }
}


