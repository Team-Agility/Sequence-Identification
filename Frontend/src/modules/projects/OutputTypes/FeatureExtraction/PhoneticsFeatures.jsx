import React from 'react'
import { Card } from 'antd';
import Measures from './Measures';
import Phonetics from './Phonetics';

function PhoneticsFeatures({data}) {
    console.log("PhoneticsFeatures ~ data", data)
    return (
        <Card title={`Phonetics Features`} >
            {
                data && data.map((act, i)=>{
                    return(
                        <div>
                            <p>ID : {act.id}</p>
                            <p>Act : {act.act}</p>
                            <p>Start Time : {act.start_time}</p>
                            <p>End Time : {act.end_time}</p>
                            <p>Speaker ID : {act.speaker_id}</p>

                            <Measures data={act.measures} />
                            <Phonetics data={act.phonetics_features} />

                            <hr />
                        </div>
                    )
                })
            }
        </Card>
    )
}

export default PhoneticsFeatures
