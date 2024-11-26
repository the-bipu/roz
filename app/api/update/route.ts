import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../utils/mongodb';
import { Movie } from '@/models/movie.js';

export async function PUT(request: NextRequest) {
    try {
        await connectMongo();

        // Extracting query parameters and body
        const { searchParams } = new URL(request.url);
        const movieId = searchParams.get('id');

        if (!movieId) {
            return NextResponse.json({ message: 'Movie ID is required' }, { status: 400 });
        }

        const body = await request.json();

        // Update the movie document
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, body, { new: true });

        if (!updatedMovie) {
            return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
        }

        return NextResponse.json(updatedMovie, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
