import { NextResponse } from "next/server";
import connectMongo from "@/utils/mongodb";
import { blogs } from '@/models/blogs';

export async function GET() {
  try {
    await connectMongo();
    const update = await blogs.find();
    const reversedUpdates = update.reverse();
    const response = NextResponse.json(reversedUpdates);

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";