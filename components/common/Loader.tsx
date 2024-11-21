import React from 'react'
import { Card, CardContent } from '../ui/card'

const Loader = () => {
    return (
        <div className='w-full h-auto flex flex-row flex-wrap gap-6'>
            {[0, 1, 2, 3, 4, 5].map((id) => (
                <div key={id} className="md:w-[32%] h-40 w-full relative">
                    <Card className="h-full text-white bg-roz border-none">
                        <CardContent className='flex items-center justify-center h-full w-full p-0'>
                            <div className="loader"></div>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default Loader