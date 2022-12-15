import { useState } from "react";

function BlogPost(props) {
    // State Indikator dafuer, ob Bodytext angezeigt werden soll oder nicht
    let [bodyOpen, setBodyOpen] = useState(false);


    // Clickhandler fuer den Like-Button
    function handleLikeClick(evt) {
        // Ruft das ueber die Props uebergebenen Callback auf
        // und uebergibt diesem die ID des Posts
        props.likeCallback(props.post.id);
    }

    // Klickhandler fuer die Ueberschrift, toggelt die Anzeige des Bodytexts
    function toggleBody(evt) {
        // Toggle den State Indikator fuer das Anzeigen des Bodytexts
        setBodyOpen(!bodyOpen);
    }

    // Variable, die beinhaltet, welcher Text im Paragraphen angezeigt wird
    // Wenn im State bodyOpen false ist, wird 'Read more...' angezeigt
    // Wenn im State bodyOpen true ist, wird der ueber Props uebergebene Text angezeigt
    let bodyText = bodyOpen ? props.post.body : 'Read more...';

    return (
        <div className="blog-post">
            {/* Fuege den Titel des ueber die Props uebergebenen Posts ein */}
            <h3 onClick={toggleBody}>{props.post.title}</h3>
            
            {/* Fuege den vorher definierten Bodytext ein */}
            <p>{bodyText}</p>

            {/* Button zum Liken, der auch die Anzahl der bisherigen Likes anzeigt. */}
            <button disabled={props.post.hasLiked} onClick={handleLikeClick}>Like {props.post.likes}</button>
        </div>
    );
}

export default BlogPost;