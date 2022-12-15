
import { useState } from 'react';
import './App.css';
import DATA from './data/data';
import BlogPost from './components/BlogPost';

function App() {
  // Speichere das Array von Post-Datensaetzen im State
  let [posts, setPosts] = useState(DATA.posts);


  // Methode zum erhoehen der Likes eine Post-Datensatzes anhand der ID des Datensatzes
  function likePostHandler(id) {
    // Erstelle lokale Array-Kopie der Posts im State
    let postsCopy = [...posts];

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
    setPosts(postsCopy);
  }

  // Erstelle via .map ein Array mit BlogPost-Komponenten fuer jeden Post-Datensatz,
  //   der im State gespeichert ist
  let blogPosts = posts.map(post => {
    // Erstelle neue BlogPost-Komponente mit der ID des Posts als Key
    // und dem entsprechen Post-Datensatz als post-prop
    return <BlogPost key={post.id} post={post} likeCallback={likePostHandler} />
  });

  return (
    <div className="App">
      <h1>My Blog</h1>

      {/* Fuege das Array an BlogPost-Komponenten ein */}
      {blogPosts}
    </div>
  );
}

export default App;
