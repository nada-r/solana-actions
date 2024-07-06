import { ACTIONS_CORS_HEADERS, ActionGetResponse, MEMO_PROGRAM_ID } from "@solana/actions"
import { Transaction, TransactionInstruction, PublicKey, ComputeBudgetProgram } from "@solana/web3.js"

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

        const transaction = new Transaction();

        transaction.add(
            // note: `createPostResponse` requires at least 1 non-memo instruction
            ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: 1000,
            }),
        transaction.add(new TransactionInstruction({
            programId: new PublicKey(MEMO_PROGRAM_ID),
            data: Buffer.from("This is a simple message", "utf8"),
            keys: []
        }),
    );
    } catch (err) {


    } catch (err) {
        return Response.json("An unknown error occured", {status:400});
    }
};