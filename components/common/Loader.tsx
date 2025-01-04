import React from 'react'

const Loader = () => {
    return (
        <div className="loader absolute top-0 left-0 flex items-center justify-center w-full h-screen bg-[#000000b9] p-0 m-0">
            <div className="gearbox">
                <div className="overlay"></div>
                <div className="gear one">
                    <div className="gear-inner">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
                <div className="gear two">
                    <div className="gear-inner">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
                <div className="gear three">
                    <div className="gear-inner">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
                <div className="gear four large">
                    <div className="gear-inner">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader