import { Component } from "react";

class BlogPost extends Component {
    constructor(props) {
        super(props);

        // State fuer die BlogPost-Komponente
        // this.state = {
        //     // Indikator dafuer, ob bereits auf den Like-Knopf gedrueckt wurde
        //     hasLiked: false
        // };

        /* this-Binding */
        this.handleLikeClick = this.handleLikeClick.bind(this);
    }

    // Clickhandler fuer den Like-Button
    handleLikeClick(evt) {
        // Ruft das ueber die Props uebergebenen Callback auf
        // und uebergibt diesem die ID des Posts
        this.props.likeCallback(this.props.post.id);

        // Setzt im lokalen State den Like-Indikator auf true (User hat gelikt)
        // this.setState({
        //     hasLiked: true
        // });
    }


    render() {
        return (
            <div className="blog-post">
                {/* Fuege den Titel des ueber die Props uebergebenen Posts ein */}
                <h3>{this.props.post.title}</h3>
                {/* Fuege den Body des ueber die Props uebergebenen Posts ein */}

                <p>{this.props.post.body}</p>
                {/* Button zum Liken, der auch die Anzahl der bisherigen Likes anzeigt. */}
                <button disabled={this.props.post.hasLiked} onClick={this.handleLikeClick}>Like {this.props.post.likes}</button>
            </div>
        );
    }
}

export default BlogPost;