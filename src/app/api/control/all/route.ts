import { IData } from "@/interfaces/control.interface"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"



export async function GET(): Promise<IData[]> {
    const session = await getServerSession(authOptions)

    console.log(session?.user?.id);
    

    const controls = await prisma.control.findMany({
        where: {
            userId: session?.user?.id
        }
    })

    const data = controls.map((control): IData => {
        return {
            id: control.id,
            date: control.date.toISOString(),
            details: control.details,
            value: control.value.toLocaleString(),
            moment: control.moment
        }
    })

    return data
}