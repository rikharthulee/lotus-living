"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LogoutButton } from "@/components/LogoutButton";

export default function DashboardForm() {
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
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);
      setErrorMsg("");
      setSuccessMsg("");
      setImagePreviewUrl("");

      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price,
          bedrooms,
          bathrooms,
          propertyType,
          rentSale,
          location,
          latitude,
          longitude,
          imageUrl,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to create property");
      }

      const created = await res.json();
      setSuccessMsg("Property saved successfully!");
      if (created.image_url) {
        setImagePreviewUrl(created.image_url);
      } else if (imageUrl) {
        setImagePreviewUrl(imageUrl);
      }

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
      setImageUrl("");
    } catch (err) {
      setErrorMsg(err.message || "Save failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 font-body">
      <div className="flex justify-end mb-4">
        <LogoutButton />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-heading">
            Add a Property
          </CardTitle>
          <CardDescription>
            Create a listing with photos, pricing, and details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Charming riverside house"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="500000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the property..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property type</Label>
                <Select
                  value={propertyType}
                  onValueChange={(value) => setPropertyType(value)}
                >
                  <SelectTrigger id="propertyType">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rentSale">Listing type</Label>
                <Select value={rentSale} onValueChange={(value) => setRentSale(value)}>
                  <SelectTrigger id="rentSale">
                    <SelectValue placeholder="For rent or sale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">For Rent</SelectItem>
                    <SelectItem value="sale">For Sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Luang Prabang"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? "Saving..." : "Save Property"}
            </Button>
          </form>

          <div className="space-y-3 mt-6">
            {errorMsg && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}
            {successMsg && (
              <Alert>
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMsg}</AlertDescription>
              </Alert>
            )}
          </div>

          {imagePreviewUrl && (
            <div className="mt-6">
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="w-full rounded shadow"
              />
            </div>
          )}
        </CardContent>
        <CardFooter />
      </Card>
    </section>
  );
}
