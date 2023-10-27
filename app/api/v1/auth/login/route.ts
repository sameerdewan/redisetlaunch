import {NextResponse} from "next/server";
import {createNextRequest, NextApiReq} from "@/lib/utils";

export const PUT = async (req: NextApiReq) => createNextRequest(
    "PUT /api/v2/login",
    async () => {
        return NextResponse.json([]);
    }
);
