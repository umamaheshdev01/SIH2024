"use client";
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

// Initialize Supabase client
const supabaseUrl = 'https://ymjsanlykbfwjrxbvzej.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltanNhbmx5a2Jmd2pyeGJ2emVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwNDU4NzcsImV4cCI6MjA0MDYyMTg3N30.wjk5gH-BJpazZeABuiXxUY8C2WIbRgh8C3soTIq7I0M';
const supabase = createClient(supabaseUrl, supabaseKey);

const PdfUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      let filePath = `${fileName}`;

      await supabase.storage
        .from('pdfs')  // replace with your Supabase bucket name
        .upload(filePath, file).then((data) => {
          filePath = `https://ymjsanlykbfwjrxbvzej.supabase.co/storage/v1/object/public/${data.data.fullPath}`;
        });
      setFileUrl(filePath);

      // Send the file URL to the backend
      await fetch('http://127.0.0.1:5000/pdfvector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          class: "14",  // replace with the appropriate class value
          url: filePath,
        }),
      });
    } catch (error) {
      console.error('Error uploading file:', error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload PDF'}
      </button>
      {fileUrl && (
        <div>
          <p>File uploaded successfully:</p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {fileUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default PdfUpload;
