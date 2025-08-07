"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadedPath, setUploadedPath] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMsg("Please select a file to upload");
      return;
    }

    try {
      setUploading(true);
      setErrorMsg("");
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, file);
      if (error) throw error;
      setUploadedPath(data.path);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-12 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}
      {uploadedPath && (
        <div>
          <p className="text-green-600">Uploaded: {uploadedPath}</p>
          <img
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${uploadedPath}`}
            alt="Uploaded"
            className="mt-2 w-full"
          />
        </div>
      )}
    </section>
  );
}

