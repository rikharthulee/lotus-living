"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadedPath, setUploadedPath] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

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
      const bucket =
        process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "images";
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);
      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(data.path);

      const { error: insertError } = await supabase
        .from("properties")
        .insert({
          name,
          description,
          price: parseFloat(price),
          image_url: publicUrl,
        });
      if (insertError) throw insertError;
      setUploadedPath(data.path);
      setName("");
      setDescription("");
      setPrice("");
      setFile(null);
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
          type="text"
          placeholder="Property Name"
          className="w-full border px-4 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full border px-4 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full border px-4 py-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
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
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${
              process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "images"
            }/${uploadedPath}`}
            alt="Uploaded"
            className="mt-2 w-full"
          />
        </div>
      )}
    </section>
  );
}

