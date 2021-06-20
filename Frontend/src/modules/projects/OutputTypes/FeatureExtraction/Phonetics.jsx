import React from 'react'

function Phonetics({ data }) {
    console.log("Phonetics ~ data", data)
    return (
        <div style={{backgroundColor:"#e9eaea"}}>
            <p>Total time : {data.total_time}</p>
            <p>Articulation rate : {data.articulation_rate}</p>
            <p>Silent pauses : {data.silent_pauses}</p>
            <p>Total syllables : {data.total_syllables}</p>
            <p>Phonation time : {data.phonation_time}</p>
        </div>
    )
}

export default Phonetics
