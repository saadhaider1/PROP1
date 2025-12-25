import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { success: false, message: 'Invalid property ID' },
                { status: 400 }
            );
        }

        const property = await db.getPropertyById(id);

        if (!property) {
            return NextResponse.json(
                { success: false, message: 'Property not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            property
        });

    } catch (error) {
        console.error('Get property error:', error);
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'Failed to fetch property' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { success: false, message: 'Invalid property ID' },
                { status: 400 }
            );
        }

        const body = await request.json();
        const property = await db.updateProperty(id, body);

        return NextResponse.json({
            success: true,
            property,
            message: 'Property updated successfully'
        });

    } catch (error) {
        console.error('Update property error:', error);
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'Failed to update property' },
            { status: 500 }
        );
    }
}
