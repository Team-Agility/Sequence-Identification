import React from 'react'
import { Card } from 'antd';
import Acts from "./Acts"
import {filters} from './../String/StringList'

export default function Sequence({data}) {
    return (
        <React.Fragment>
            {data && data.filter(c => filters.indexOf(c.title) < 0).map((seq,i)=>{
                return(
                    <Card title={seq.title}>
                        <Acts data={seq.acts}/>
                    </Card>
                )
            })}
        </React.Fragment>
       
    )
}
