// import OpenAI from "openai";
// import {auth} from "@clerk/nextjs";
// import {NextResponse} from "next/server";
// import ApiLimitService from "@/services/ApiLimitService";
//
// const openAi = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });
//
// export async function POST(req: Request) {
//     try {
//         const {userId} = auth();
//         if (!userId) return new NextResponse('Unauthorized', {status: 401});
//         if (!openAi.apiKey) return new NextResponse('OpenAI API Key not configured', {status: 500});
//         const body = await req.json();
//         const messages = body.messages;
//         if (!messages) return new NextResponse('Message is required', {status: 400});
//         const freeTrial = await ApiLimitService.checkApiLimit(userId);
//         if (!freeTrial) return new NextResponse('Free trial has expired', {status: 401});
//         const response = await openAi.chat.completions.create({
//             messages: [{role: 'user', content: messages}],
//             model: 'gpt-3.5-turbo'
//         });
//         await ApiLimitService.increaseLimit(userId);
//         return NextResponse.json(response.choices[0].message);
//     } catch (error) {
//         console.log('Conversation Error', error, JSON.stringify({error}, null, 2));
//         return new NextResponse('Internal error', {status: 500});
//     }
// }

export async function POST() {}