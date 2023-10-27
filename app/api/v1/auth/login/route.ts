import {createNextRequest, NextApiReq} from "@/app/api/apiUtils";
import {NextResponse} from "next/server";

export const PUT = async (req: NextApiReq) => createNextRequest(
    "PUT /api/v2/login",
    async () => {
        return NextResponse.json([]);
    }
);
