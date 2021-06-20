import React from 'react'

function Audio({data}) {
console.log("Audio ~ data", data)
    
    return (
        <div>
            <audio controls>
                <source src={data} type="audio/mpeg"/>
                Your browser does not support the video tag.
            </audio>
        </div>
    )
}

export default Audio
