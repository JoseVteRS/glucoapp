import { IData } from "@/interfaces/control.interface"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextRequest, NextResponse } from "next/server"



export async function GET(req: NextRequest, res: NextResponse): Promise<IData[]> {
    const session = await getServerSession(authOptions)

    console.log(session);

    const controls = await prisma.control.findMany({
        where: {
            userId: session?.user?.id
        }
    })

   console.log(controls);
   

    return res.status().json(data);
}