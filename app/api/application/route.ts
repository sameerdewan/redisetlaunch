import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import applicationRepositoryClient from "@/repositories/ApplicationRepository"

export async function GET(req: Request) {
    try {
        const userId = auth().userId;
        if (userId === null) return new NextResponse('Unauthorized', {status: 401});
        const body = await req.json();
        if (body.id) {
            const application = await applicationRepositoryClient.getApplicationByIdAndUserId(
                body.id,
                userId
            );
            return NextResponse.json(application);
        }
        const applications = await applicationRepositoryClient.getApplicationsByUserId(userId);
        return NextResponse.json(applications);
    } catch (error) {
        console.log(
            'Application error',
            error,
            JSON.stringify({error}, null, 2)
        );
        return new NextResponse('Internal error', {status: 500});
    }
}

export async function POST(req: Request) {
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

export async function PUT(req: Request) {
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
