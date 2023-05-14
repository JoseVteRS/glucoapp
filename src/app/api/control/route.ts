import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

    // Verificar si el usuario está autenticado
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        NextResponse.json({
            status: 404,
            error: "Not Found",
        })
    }

    const controlData = await prisma.control.findMany({
        where: {
            user: {
                id: session?.user.id
            }
        },
        orderBy: {
            date: 'asc',
        }
    })

    return NextResponse.json({
        controlData
    });


}