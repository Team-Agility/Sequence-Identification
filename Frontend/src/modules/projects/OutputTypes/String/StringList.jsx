import React from 'react'
import { Card } from 'antd';

export default function StringList({data}) {
    console.log("StringList : ", data)
    return (
        <React.Fragment>
            <Card title={`Topics`} style={{ width: 300 }}>
                {data && data.map((content,i)=>{
                    return(
                        <p>{content}</p>
                    )
                })}
            </Card>
        </React.Fragment>
       
    )
}
