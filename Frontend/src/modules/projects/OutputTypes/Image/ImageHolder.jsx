import React from 'react'
import { Image  } from 'antd';

export default function ImageHolder({data}) {
    console.log("ImageHolder : ", data)
    return (
        <React.Fragment>
           <Image
                width={600}
                src={data}
            />
        </React.Fragment>
       
    )
}
