import React from 'react'

export default function Transcript({data}) {
    return (
        <React.Fragment>
            <table title={`Transcript`} style={{textAlign: 'center'}}>
                <tr>
                    <th>Speaker</th>
                    <th style={{width: '200px'}}>Time</th>
                    <th>Uttarance</th>
                </tr>
                {data && data.map((content,i)=>{
                    return(
                        <React.Fragment>
                            <tr>
                                <td>{content["speaker_id"]}</td>
                                <td>{content["start_time"]} - {content["end_time"]}</td>
                                <td>{content["segment"]}</td>
                            </tr>
                        </React.Fragment>
                    )
                })}
            </table>
        </React.Fragment>
       
    )
}
