import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/utils/mongodb";
import { blogs } from '@/models/blogs';

export async function GET(request: NextRequest) {
    try {
        await connectMongo();

        const url = new URL(request.url);
        const slug = url.searchParams.get('slug');
        const id = url.searchParams.get('id');

        if (!id || id !== process.env.ROUTE_ID) {
            return NextResponse.json({ message: "Routes are only accessible by the organization." }, { status: 400 });
        }

        if (!slug) {
            return NextResponse.json({ message: 'url parameter is required' }, { status: 400 });
        }

        // Find the user by email
        const update = await blogs.findOne({ slug });

        if (!update) {
            return NextResponse.json({ message: 'Internship not found' }, { status: 404 });
        }

        return NextResponse.json(update, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export const dynamic = "force-dynamic";