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
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertyType, setPropertyType] = useState("House");
  const [rentSale, setRentSale] = useState("rent");

  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

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
      const bucket = "images";
      const filePath = `test/${Date.now()}-${file.name}`;

      const { data: uploadedFile, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      const publicUrl = urlData?.publicUrl;
      if (!publicUrl) throw new Error("Failed to get public image URL");

      const { error: insertError } = await supabase.from("properties").insert({
        user_id: user.id,
        title,
        description,
        price: parseFloat(price),
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        property_type: propertyType,
        rent_sale: rentSale,
        location,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        image_url: publicUrl,
      });

      if (insertError) throw insertError;

      setSuccessMsg("Property uploaded successfully!");
      setImagePreviewUrl(publicUrl);

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setBedrooms("");
      setBathrooms("");
      setPropertyType("House");
      setRentSale("rent");
      setLocation("");
      setLatitude("");
      setLongitude("");
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
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Bedrooms"
          className="w-full border px-4 py-2"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Bathrooms"
          className="w-full border px-4 py-2"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
        <select
          className="w-full border px-4 py-2"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
        </select>

        <select
          className="w-full border px-4 py-2"
          value={rentSale}
          onChange={(e) => setRentSale(e.target.value)}
        >
          <option value="rent">For Rent</option>
          <option value="sale">For Sale</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          className="w-full border px-4 py-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="Latitude"
          className="w-full border px-4 py-2"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          className="w-full border px-4 py-2"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
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
