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
      const filePath = `uploads/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("images")
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
    <section className="max-w-xl mx-auto px-4 sm:px-6 py-10 font-body">
      <h1 className="text-2xl sm:text-3xl font-heading mb-6">Add a Property</h1>

      <form onSubmit={handleUpload} className="space-y-4">
        {[
          { label: "Title", value: title, setValue: setTitle },
          {
            label: "Description",
            value: description,
            setValue: setDescription,
            textarea: true,
          },
          { label: "Price", value: price, setValue: setPrice, type: "number" },
          {
            label: "Bedrooms",
            value: bedrooms,
            setValue: setBedrooms,
            type: "number",
          },
          {
            label: "Bathrooms",
            value: bathrooms,
            setValue: setBathrooms,
            type: "number",
          },
          { label: "Location", value: location, setValue: setLocation },
          {
            label: "Latitude",
            value: latitude,
            setValue: setLatitude,
            type: "number",
            step: "any",
          },
          {
            label: "Longitude",
            value: longitude,
            setValue: setLongitude,
            type: "number",
            step: "any",
          },
        ].map(({ label, value, setValue, textarea, type = "text", step }, i) =>
          textarea ? (
            <textarea
              key={i}
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-softgreen"
              placeholder={label}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : (
            <input
              key={i}
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-softgreen"
              type={type}
              step={step}
              placeholder={label}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )
        )}
        <select
          className="w-full border border-gray-300 rounded px-4 py-3 text-darkgreen/50 focus:outline-none focus:ring-2 focus:ring-softgreen"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
        </select>

        <select
          className="w-full border border-gray-300 rounded px-4 py-3 text-darkgreen/50 focus:outline-none focus:ring-2 focus:ring-softgreen"
          value={rentSale}
          onChange={(e) => setRentSale(e.target.value)}
        >
          <option value="rent">For Rent</option>
          <option value="sale">For Sale</option>
        </select>

        <input
          type="file"
          accept="image/*"
          className="w-full border border-gray-300 px-4 py-3 rounded text-darkgreen/50"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          type="submit"
          className="w-full bg-softgreen text-white py-3 rounded hover:bg-terracotta transition-colors font-heading"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {errorMsg && <p className="text-red-600 mt-4">{errorMsg}</p>}
      {successMsg && <p className="text-green-600 mt-4">{successMsg}</p>}

      {imagePreviewUrl && (
        <div className="mt-6">
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="w-full rounded shadow"
          />
        </div>
      )}
    </section>
  );
}
