import React from 'react'

function Acts({data}) {
    return (
        <div>
            {
                data && data.map((content,j)=>{
                    return(
                        <p key={j}>{content}</p>
                    )
                })
            }
        </div>
    )
}

export default Acts
