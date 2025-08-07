"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [title, setTitle] = useState("");
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
      setSuccessMsg("");
      setImagePreviewUrl("");

      // ✅ Get session and user
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        setErrorMsg("User not logged in.");
        setUploading(false);
        return;
      }

      const user = session.user;
      const bucket = "images"; // ✅ make sure this matches your real bucket name

      // ✅ Log the file to debug
      console.log("Uploading file:", file);

      // ✅ Generate hardcoded safe path
      const filePath = `test/${Date.now()}-${file.name}`;
      console.log("File path:", filePath);

      // ✅ Upload to Supabase Storage
      const { data: uploadedFile, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      // ✅ Log error if failed
      if (uploadError) {
        console.error("Upload failed:", uploadError);
        throw uploadError;
      }

      // ✅ Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      const publicUrl = urlData?.publicUrl;
      if (!publicUrl) throw new Error("Failed to get public image URL");

      // ✅ Insert into properties table
      const { error: insertError } = await supabase.from("properties").insert({
        user_id: user.id,
        title,
        description,
        price: parseFloat(price),
        image_url: publicUrl,
      });

      if (insertError) throw insertError;

      setSuccessMsg("Property uploaded successfully!");
      setImagePreviewUrl(publicUrl);
      setTitle("");
      setDescription("");
      setPrice("");
      setFile(null);
    } catch (err) {
      setErrorMsg(err.message || "Upload failed.");
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
          placeholder="Title"
          className="w-full border px-4 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
      {successMsg && <p className="text-green-600">{successMsg}</p>}

      {imagePreviewUrl && (
        <div>
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="mt-4 w-full rounded"
          />
        </div>
      )}
    </section>
  );
}
