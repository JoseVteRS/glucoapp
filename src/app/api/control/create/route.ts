import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: Request) {
    // Verificar si el usuario está autenticado
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const { value, moment } = await req.json();

    // Validar los datos de entrada


    // Crear un nuevo registro de control
    const newControl = await prisma.control.create({
        data: {
            value: Number(value),
            moment: moment,
            details: "",
            date: new Date(), // Utilizar una marca de tiempo en lugar de una cadena de texto
            user: {
                connect: {
                    id: session.user.id,
                },
            },
        },
        select: {
            id: true, // Seleccionar solo el ID del nuevo registro
        },
    });

    // Devolver solo el ID del nuevo registro
    return NextResponse.json({
        id: newControl.id,
    });
}