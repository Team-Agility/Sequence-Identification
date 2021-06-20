import React from 'react'

function Measures({ data }) {
    console.log("Measures ~ data", data)
    return (
        <div style={{backgroundColor:"#e9eaea"}}>
            <p>MPD : {data.MPD}</p>
            <p>Articulation Rate : {data.articulation_rate}</p>
            <p>Mean length of runs : {data.mean_length_of_runs}</p>
            <p>Phonation time ratio : {data.phonation_time_ratio}</p>
            <p>Short term energy : {data.short_term_energy}</p>
            <p>Silent pauses rate : {data.silent_pauses_rate}</p>
            <p>Speech rate : {data.speech_rate}</p>
        </div>
    )
}

export default Measures
