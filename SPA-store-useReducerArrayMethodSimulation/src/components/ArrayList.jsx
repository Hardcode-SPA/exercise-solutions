import ArrayEntry from "./ArrayEntry";


// Impliziter Export
export default function ArrayList({dates}) {

    let entries = dates.map(date => {
        return <ArrayEntry key={date.getTime()} date={date}/>
    });

    return (
        <ul>
            {entries}
        </ul>
    );
}

// Expliziter Export
// export default ArrayList;