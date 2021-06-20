import React from 'react'
import { Card } from 'antd';
import Acts from "./Acts"
export default function Sequence({data}) {
    console.log("Sequence : ", data)
    return (
        <React.Fragment>
            {data && data.map((seq,i)=>{
                return(
                    <Card title={seq.title} >
                        <Acts data={seq.acts}/>
                    </Card>
                )
            })}
        </React.Fragment>
       
    )
}
