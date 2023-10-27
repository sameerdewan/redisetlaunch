import {createNextRequest, NextApiReq} from "@/app/api/apiUtils";
import {NextResponse} from "next/server";

export const POST = async (req: NextApiReq) => createNextRequest(
    "POST /api/v2/register",
    async () => {
        return NextResponse.json([]);
    }
);