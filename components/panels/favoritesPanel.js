import styles from "@/styles/Panel.module.css";
import {useEffect, useState} from "react";
import AddFavorite from "@/components/addFavorite";


export default function FavoritesPanel({color}) {
  const [favoritePopup, setFavoritePopup] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [loadedFavorites, setLoadedFavorites] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      setFavorites(parsedFavorites);
    }
    setLoadedFavorites(true);
  }, []);

  useEffect(() => {
    loadedFavorites && localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const url = e.target.url.value;
    setFavoritePopup(false);
    setFavorites([...favorites, {name: name, url: url}]);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };


  return (<>
    <div
      className={styles.subsection}
      style={{background: color}}
    >
      <h2 className={styles.subheader}> Favorites </h2>
      <div className={styles.scrollBox}>
        <ul id="favoritesList" className={styles.list}>
          {favorites && favorites.map((item, index) => (<li key={index}>
            <a href={item.url} target="_blank">
              {item.name}
            </a>
          </li>))}
        </ul>
      </div>
      <button
        className={styles.button}
        onClick={() => setFavoritePopup(true)}
      >
        Add Favorite
      </button>
    </div>
    {favoritePopup && (<AddFavorite
      closeMethod={() => setFavoritePopup(false)}
      addMethod={addFavorite}
    />)}
  </>);
}