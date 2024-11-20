import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const Loader = () => {
    return (
        <div className='w-full h-auto flex flex-row flex-wrap gap-4'>
            {[0, 1, 2, 3, 4, 5].map((id) => (
                <div key={id} className='w-96 relative'>
                    <Card>
                        <CardHeader>
                            <Skeleton className='w-20 h-8' />
                            <Skeleton className='w-30 h-12' />
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-end space-x-1.5 text-red-500 absolute top-4 right-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className='flex flex-col'>
                                <span>For the student of,</span>
                                <Skeleton className='w-20 h-8' />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default Loader