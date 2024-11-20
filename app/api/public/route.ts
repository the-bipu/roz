import { NextResponse, NextRequest } from 'next/server';
import connectMongo from '../../../utils/mongodb';
import { Movie } from '@/models/movie.js'

export async function GET(request: NextRequest) {
    try {
        await connectMongo();
        const posts = await Movie.find({});
        const reversePosts = posts.reverse();

        return NextResponse.json(reversePosts, { status: 200 });
    } catch (error: any) {
        console.error('Server Error:', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";