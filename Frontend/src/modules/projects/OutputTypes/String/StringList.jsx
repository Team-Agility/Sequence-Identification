import React from 'react'
import { Card } from 'antd';

export const filters = ['tail', 'favourite animal', 'home', 'point']

export default function StringList({data}) {
    return (
        <React.Fragment>
            <table title={`Topics`} style={{ width: 300, margin: 'auto' }}>
                <tr>
                    <th>Topics</th>
                </tr>
                {data && data.filter(c => filters.indexOf(c) < 0).map((content,i)=>{
                    return(
                        <tr>
                            <td>{content}</td>
                        </tr>
                    )
                })}
            </table>
        </React.Fragment>
       
    )
}
