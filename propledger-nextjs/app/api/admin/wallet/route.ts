import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'lib', 'adminWallet.json');

export async function GET() {
    try {
        if (!fs.existsSync(configPath)) {
            return NextResponse.json({ success: true, walletAddress: "" });
        }
        const data = fs.readFileSync(configPath, 'utf8');
        const config = JSON.parse(data);
        return NextResponse.json({ success: true, walletAddress: config.walletAddress || "" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { walletAddress } = body;

        if (typeof walletAddress !== 'string') {
            return NextResponse.json({ success: false, error: 'Invalid wallet address' }, { status: 400 });
        }

        const config = { walletAddress };
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

        return NextResponse.json({ success: true, message: 'Wallet address updated successfully' });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
