
import { Component } from 'react';
import '../css/App.css';
import DATA from './data/data';
import BlogPost from './components/BlogPost';

/* 
  Schreibe eine Komponente BlogPost zum Anzeigen eines Blogpost aus den Daten in DATA.
  Rendere hier nun fuer jeden Blogpost aus DATA eine solche BlogPost Komponente.
  Ueberlege, ob die Komponenten Klassenbasiert oder Funktionbasiert sein muessen (brauchen sie z.B. einen State?)
*/
class App extends Component {
  constructor(props) {
    super(props);

    // State fuer die App-Komponente
    this.state = {
      // Speichere das Array von Post-Datensaetzen im State
      posts: []
    }

    /* this-Binding */
    this.likePostHandler = this.likePostHandler.bind(this);
  }

  /* ---- Life-Cycle-Methods ---- */
  componentDidMount() {
    console.log("componentDidMount");
    let storedPosts = JSON.parse(localStorage.getItem('posts'));

    if ((storedPosts !== null) && storedPosts.length > 0) {
      this.setState({
        posts: storedPosts
      });
    
    } else {
      this.setState({
        posts: DATA.posts
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    localStorage.setItem('posts', JSON.stringify(this.state.posts));
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }



  // Methode zum erhoehen der Likes eine Post-Datensatzes anhand der ID des Datensatzes
  likePostHandler(id) {
    console.log('Liked post with ID:', id);

    // Erstelle lokale Array-Kopie der Posts im State
    let postsCopy = [...this.state.posts];

    // Finde Index des gesuchten Post-Datensatzes mit einem ID Vergleich
    let postIndex = postsCopy.findIndex(post => {
      return post.id === id;
    });

    // Erhoehe die Anzahl der Likes im gesuchten Post-Datensatz um 1
    postsCopy[postIndex].likes += 1;

    // Setze Indikator dafuer, dass bereits gelikt wurde
    postsCopy[postIndex].hasLiked = true;

    // Tausche veraenderten Datensatz im State der App-Komponente aus
    // (Das stoesst das Neu-Rendern der View an)
    this.setState({
      posts: postsCopy
    });
  }


  render() {

    // Erstelle via .map ein Array mit BlogPost-Komponenten fuer jeden Post-Datensatz,
    // der im State gespeichert ist
    let blogPosts = this.state.posts.map(post => {
      // Erstelle neue BlogPost-Komponente mit der ID des Posts als Key
      // und dem entsprechen Post-Datensatz als post-prop
      return <BlogPost key={post.id} post={post} likeCallback={this.likePostHandler} />
    });

    return (
      <div className="App">
        <h1>My Blog</h1>

        {/* Fuege das Array an BlogPost-Komponenten ein */}
        {blogPosts}
      </div>
    );
  }
}



export default App;
