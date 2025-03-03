import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../utils/mongodb';
import { Movie } from '@/models/movie.js'

export async function POST(request: NextRequest) {
    try {
        await connectMongo();

        const body = await request.json();
        const post = await Movie.create(body);

        return NextResponse.json(post, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}