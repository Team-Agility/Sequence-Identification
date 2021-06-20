import React from 'react'
import { Card } from 'antd';

export default function CategorizedSequence({data}) {
    console.log("CategorizedSequence : ", data)
    return (
        <React.Fragment>
            {data && data.map((seq,i)=>{
                return(
                    <Card title={`Category : ${seq.category}`} >
                        {/* <h3>Category : {seq.category}</h3> */}
                        {
                            seq.acts.map((content,j)=>{
                                return(
                                    <p>{content}</p>
                                )
                            })
                        }
                    </Card>
                )
            })}
        </React.Fragment>
       
    )
}
