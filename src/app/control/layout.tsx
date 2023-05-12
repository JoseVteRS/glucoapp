import { getServerSession } from 'next-auth'
import React from 'react'
import { LogoutButton } from '../auth'

type Props = {
    children: React.ReactNode[]
}

const ControlLayout = async ({ children }: Props) => {

    const session = await getServerSession();

    return (
        <div className='min-h-screen bg-fuchsia-50'>
            <div className='bg-fuchsia-300 text-gray-800 py-1' >
                <nav className='w-full px-2 md:w-2/3 mx-auto  flex items-center justify-between' >
                    <h2 className='font-bold' >
                        {
                            process.env.NODE_ENV === 'development' ? "NOMBRE" : session?.user?.name
                        }
                    </h2>
                    <LogoutButton />
                </nav>
            </div>
            {children}
        </div>
    )
}

export default ControlLayout