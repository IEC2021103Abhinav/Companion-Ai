import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { companionId: string } }) {
    try {
        const body = await req.json();
        const user = await currentUser();
        // what we have in the form , we have to take all the attributes with same spelling 
        const { src, name, description, instructions, seed, categoryId } = body;
        if (!params.companionId) {
            return new NextResponse("Companion ID is Required", { status: 400 });
        }
        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!src || !name || !description || !seed || !categoryId || !instructions) {
            return new NextResponse("Missing required Fields", { status: 400 });
        }
        // for pro subscription

        const companion = await prismadb.companion.update({
            where: {
                id: params.companionId,
            },
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed,

            }
        });
        return NextResponse.json(companion);

    } catch (error) {
        console.log("[COMPANION_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }

}