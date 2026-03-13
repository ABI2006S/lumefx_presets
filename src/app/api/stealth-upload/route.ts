import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        // Verify credentials securely on the server
        if (username !== 'johan' || password !== 'johan@1606200607') {
            return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
        }

        const file = formData.get('file') as File | null;
        const exactPath = formData.get('exactPath') as string | null;

        if (!file || !exactPath) {
            return NextResponse.json({ error: 'Invalid upload payload' }, { status: 400 });
        }

        // Convert the file File API object into a Node JS Buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Target exact file path inside the local /public folder
        // ExactPath from frontend will be like "/assets/previews/presets/preset-preview.jpg"
        const cleanPath = exactPath.startsWith('/') ? exactPath.slice(1) : exactPath;
        const filePath = path.join(process.cwd(), 'public', ...cleanPath.split('/'));
        const uploadDir = path.dirname(filePath);

        // Automatically build subdirectory paths if they don't exist yet
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write the binary to disk overwriting the exact file
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({
            success: true,
            path: exactPath
        });

    } catch (error) {
        console.error('Stealth Upload Error:', error);
        return NextResponse.json({ error: 'Internal Server Constraint' }, { status: 500 });
    }
}
