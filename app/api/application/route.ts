import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import applicationRepositoryClient from "@/repositories/ApplicationRepository"

export async function GET(req: Request) {
    try {
        const subscriptionKey = req.headers.get('x-flags-subscription-key');
        let userId: string | null = null;
        if (subscriptionKey === null) {
            userId = auth().userId;
            if (userId === null) return new NextResponse('Unauthorized', {status: 401});
        }
        // TODO: Validate the subscription key
        // TODO: Populate userId from the fetched subscription
        userId = ''
        const body = await req.json();
        const application = await applicationRepositoryClient.getApplicationByIdAndUserId(
            body.id,
            userId
        );
        return NextResponse.json(application);
    } catch (error) {
        console.log(
            'Application error',
            error,
            JSON.stringify({error}, null, 2)
        );
        return new NextResponse('Internal error', {status: 500});
    }
}