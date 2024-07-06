import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, MEMO_PROGRAM_ID, createPostResponse } from "@solana/actions"
import { Transaction, TransactionInstruction, PublicKey, ComputeBudgetProgram, Connection, clusterApiUrl} from "@solana/web3.js"

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

export const POST = async (req: Request) => {
    try {
        const body: ActionPostRequest = await req.json();

        let account: PublicKey;
        try {
            account = new PublicKey(body.account);
        } catch (err) {
            return new Response('Invalid "account" provided', {
                status: 400,
                headers: ACTIONS_CORS_HEADERS,
            });
        }

        const transaction = new Transaction();

        transaction.add(
            // note: `createPostResponse` requires at least 1 non-memo instruction
            ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: 1000,
            }),
        );
        transaction.add(new TransactionInstruction({
            programId: new PublicKey(MEMO_PROGRAM_ID),
            data: Buffer.from("This is a simple message", "utf8"),
            keys: []
        }),
    );

    transaction.feePayer = account;

    const connection = new Connection(clusterApiUrl("devnet"));
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
        fields:
            {
                transaction
            },
            //signer
    });

    return Response.json(payload, {headers: ACTIONS_CORS_HEADERS});
    } catch (err) {
        return Response.json("An unknown error occured", {status:400});
    }
};