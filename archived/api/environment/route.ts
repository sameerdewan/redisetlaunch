import {auth} from "@clerk/nextjs";
import {NextRequest, NextResponse} from "next/server";
import environmentRepositoryClient from "@/archived/data/EnvironmentRepository";

export async function GET(req: NextRequest) {
    try {
        const userId = auth().userId;
        if (userId === null) return new NextResponse('Unauthorized', {status: 401});
        const id = req.nextUrl.searchParams.get('id');
        if (id === null) {
            const applicationId = req.nextUrl.searchParams.get('applicationId');
            if (applicationId === null) return new NextResponse('No recognized params passed', {status: 400});
            const environments = await environmentRepositoryClient.getEnvironmentsByApplicationIdAndUserId(
              applicationId,
              userId
            );
            return NextResponse.json(environments);
        }
        const environment = await environmentRepositoryClient.getEnvironmentByIdAndUserId(
            id,
            userId
        );
        return NextResponse.json(environment);
    } catch (error) {
        console.log(
            'Environment error',
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
        const environment = await req.json();
        const savedEnvironment = await environmentRepositoryClient.saveEnvironment(environment);
        return NextResponse.json(savedEnvironment);
    } catch (error) {
        console.log(
            'Environment error',
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
        const environment = await req.json();
        const savedEnvironment = await environmentRepositoryClient.saveEnvironment(environment);
        return NextResponse.json(savedEnvironment);
    } catch (error) {
        console.log(
            'Environment error',
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
        const deletedEnvironment = await environmentRepositoryClient.deleteEnvironmentByIdAndUserId(
            data.id,
            userId
        );
        return NextResponse.json(deletedEnvironment);
    } catch (error) {
        console.log(
            'Environment error',
            error,
            JSON.stringify({error}, null, 2)
        );
        return new NextResponse('Internal error', {status: 500});
    }
}
