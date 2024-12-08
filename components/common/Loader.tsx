import React from 'react'

const Loader = () => {
    return (
        <div className='w-full h-auto flex flex-row flex-wrap gap-6'>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="pyramid-loader">
                    <div className="wrapper">
                        <span className="side side1"></span>
                        <span className="side side2"></span>
                        <span className="side side3"></span>
                        <span className="side side4"></span>
                        <span className="shadow"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader