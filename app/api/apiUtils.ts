import {NextRequest, NextResponse} from "next/server";

type PassedNextFunction = () => Promise<NextResponse>;

export async function createNextRequest(name: string, handler: PassedNextFunction) {
    try {
        return await handler();
    } catch (error) {
        console.log(
            `${name} error`,
            error,
            JSON.stringify({error}, null, 2)
        );
        return new NextResponse('Internal error', {status: 500});
    }
}

export type NextApiReq = (req: NextRequest) => Promise<NextResponse>;
