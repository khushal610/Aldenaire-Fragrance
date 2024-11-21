import React from 'react'

function ProductionProcessPointCard({ number,title,process }) {
  return (
    <>
        <div className='flex flex-col production-card px-10 py-3'>
            <h1 className='text-2xl'>{number} {title}</h1>
            <p>{process}</p>
        </div>
    </>
  )
}

export default ProductionProcessPointCard
