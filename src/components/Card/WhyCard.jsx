import React from 'react'

function WhyCard({ icon,title,description }) {
  return (
    <>
        <div className='why-card-1 w-4/12 p-5 rounded-md'>
            <div>
                <h1 className='why-card-1-title text-2xl text-center flex flex-col items-center gap-1'>{icon}{title}</h1>
            </div>
            <div>
            <p>
                {description}
            </p>
            </div>
        </div>        
    </>
  )
}

export default WhyCard
