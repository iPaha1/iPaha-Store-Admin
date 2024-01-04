import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


// GET /api/stores. Api route to create a new store.
export async function POST(
    req: Request,
 ) {
    try {
        const { userId } = auth();
        const body  = await req.json();
        const { name } = body;

        // Check if the user is authenticated.
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the name is valid.
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        // Create a new store.
        const store = await prismadb.store.create({
            data: {
                name,
                userId,
            },
        });

        // Return the store object as JSON.
        return NextResponse.json(store);

    // Catch any errors and return a 500.
    } catch (error) {
        console.log("[STORES_POST_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}