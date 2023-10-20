import {auth} from "@clerk/nextjs";
import {NextRequest, NextResponse} from "next/server";
import applicationRepositoryClient from "@/data/application/ApplicationRedisClient"

export async function GET(req: NextRequest) {
    try {
        const userId = auth().userId;
        if (userId === null) return new NextResponse('Unauthorized', {status: 401});
        const id = req.nextUrl.searchParams.get('id');
        if (id !== null) {
            const application = await applicationRepositoryClient.getApplicationByIdAndUserId(
                id,
                userId
            );
            return NextResponse.json(application);
        }
        const applications = await applicationRepositoryClient.getApplicationsByUserId(userId);
        return NextResponse.json(applications ?? []);
    } catch (error) {
        console.log(
            'Application error',
            error,
            JSON.stringify({error}, null, 2)
        );
        return new NextResponse('Internal error', {status: 500});
    }
}

export async function POST(req: NextRequest) {
    try {
        const userId = auth().userId;
        if (userId === null) return new NextResponse('Unauthorized', {status: 401});
        const application = await req.json();
        const savedApplication = await applicationRepositoryClient.saveApplication(application);
        return NextResponse.json(savedApplication);
    } catch (error) {
        console.log(
            'Application error',
            error,
            JSON.stringify({error}, null, 2)
        );
        return new NextResponse('Internal error', {status: 500});
    }
}

export async function PUT(req: NextRequest) {
    try {
        const userId = auth().userId;
        if (userId === null) return new NextResponse('Unauthorized', {status: 401});
        const application = await req.json();
        const savedApplication = await applicationRepositoryClient.saveApplication(application);
        return NextResponse.json(savedApplication);
    } catch (error) {
        console.log(
            'Application error',
            error,
            JSON.stringify({error}, null, 2)
        );
        return new NextResponse('Internal error', {status: 500});
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const userId = auth().userId;
        if (userId === null) return new NextResponse('Unauthorized', {status: 401});
        const data = await req.json();
        const deletedApplication = await applicationRepositoryClient.deleteApplicationByIdAndUserId(
            data.id,
            userId
        );
        return NextResponse.json(deletedApplication);
    } catch (error) {
        console.log(
            'Application error',
            error,
            JSON.stringify({error}, null, 2)
        );
        return new NextResponse('Internal error', {status: 500});
    }
}
