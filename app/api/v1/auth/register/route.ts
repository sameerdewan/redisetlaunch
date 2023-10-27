import {NextResponse} from "next/server";
import {createNextRequest, NextApiReq} from "@/lib/utils";

export const POST = async (req: NextApiReq) => createNextRequest(
    "POST /api/v2/register",
    async () => {
        return NextResponse.json([]);
    }
);