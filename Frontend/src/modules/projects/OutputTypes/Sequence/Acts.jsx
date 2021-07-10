import React from 'react'

function Acts({data}) {
    return (
        <table>
            {
                data && data.map((content,j)=>{
                    return(
                        <tr key={j}>
                            <td>{content}</td>
                        </tr>
                    )
                })
            }
        </table>
    )
}

export default Acts
