import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const runtime = "nodejs";

const uuidPattern =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
const asUuidOrExisting = (value) =>
  typeof value === "string" && uuidPattern.test(value) ? value : null;

export async function GET() {
  try {
    const properties = await prisma.properties.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error fetching properties", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
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
    } = body;

    const user_id = asUuidOrExisting(session.user.id);
    if (!user_id) {
      return NextResponse.json(
        { error: "Invalid user session" },
        { status: 401 }
      );
    }
    const property_type = propertyType ?? null;
    const rent_sale = rentSale ?? null;
    const property_location = location ?? null;
    if (!title || !description || !imageUrl) {
      return NextResponse.json(
        { error: "Title, description, and imageUrl are required" },
        { status: 400 }
      );
    }

    const parsedPrice =
      price === undefined || price === null || price === ""
        ? null
        : Number(price);
    const parsedBedrooms =
      bedrooms === undefined || bedrooms === null || bedrooms === ""
        ? 0
        : Number(bedrooms);
    const parsedBathrooms =
      bathrooms === undefined || bathrooms === null || bathrooms === ""
        ? 0
        : Number(bathrooms);
    const parsedLatitude =
      latitude === undefined || latitude === null || latitude === ""
        ? null
        : Number(latitude);
    const parsedLongitude =
      longitude === undefined || longitude === null || longitude === ""
        ? null
        : Number(longitude);

    if (
      parsedPrice === null ||
      Number.isNaN(parsedPrice) ||
      Number.isNaN(parsedBedrooms) ||
      Number.isNaN(parsedBathrooms) ||
      Number.isNaN(parsedLatitude) ||
      Number.isNaN(parsedLongitude)
    ) {
      return NextResponse.json(
        { error: "Numeric fields must be valid numbers" },
        { status: 400 }
      );
    }

    const created = await prisma.properties.create({
      data: {
        title,
        description,
        price: parsedPrice,
        bedrooms: parsedBedrooms,
        bathrooms: parsedBathrooms,
        user_id,
        property_type,
        rent_sale,
        location: property_location,
        latitude: parsedLatitude,
        longitude: parsedLongitude,
        image_url: imageUrl,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating property", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}
