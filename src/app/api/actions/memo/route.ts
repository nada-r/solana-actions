import { ACTIONS_CORS_HEADERS, ActionGetResponse } from "@solana/actions"

export const GET = (req: Request) => {

    const payload : ActionGetResponse = {
        icon: new URL("/solana_devs.jpeg", new URL(req.url).origin).toString(),
        label: "Send Memo",
        description: "Follow the alpha",
        title: "Here is my call"

    }

    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS
    });
};

export const OPTIONS = GET;

export const POST = (req: Request) => {
    try {
    } catch (err) {
        return Response.json("An unknown error occured", {status:400});
    }
};