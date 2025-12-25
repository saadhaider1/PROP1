import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const properties = await db.getProperties();

        return NextResponse.json({
            success: true,
            properties,
            count: properties.length
        });

    } catch (error) {
        console.error('Get properties error:', error);
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'Failed to fetch properties' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = ['title', 'location', 'price', 'token_price', 'total_tokens', 'property_type', 'owner_id'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, message: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        // Set available_tokens to total_tokens if not provided
        if (!body.available_tokens) {
            body.available_tokens = body.total_tokens;
        }

        // Set is_active to true by default
        if (body.is_active === undefined) {
            body.is_active = true;
        }

        const property = await db.createProperty(body);

        return NextResponse.json({
            success: true,
            property,
            message: 'Property created successfully'
        });

    } catch (error) {
        console.error('Create property error:', error);
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'Failed to create property' },
            { status: 500 }
        );
    }
}
