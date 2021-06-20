import React from 'react'
import { Card } from 'antd';

export default function Transcript({data}) {
    console.log("Transcript : ", data)
    return (
        <React.Fragment>
            <Card title={`Transcript`}>
                {data && data.map((content,i)=>{
                    return(
                        <React.Fragment>
                            <p>content :  {content["segment"]}</p>
                            <p>end_time :  {content["end_time"]}</p>
                            <p>is_punction :  {content["is_punction"]? "True" : "False"}</p>
                            <p>speaker_id :  {content["speaker_id"]}</p>
                            <p>start_time :  {content["start_time"]}</p>
                            <hr/>
                        </React.Fragment>
                    )
                })}
            </Card>
        </React.Fragment>
       
    )
}
