import MovieCard from "../components/MovieCard";
import {useEffect,useState} from 'react';
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

function Favourites() {
  const [ favourites,setFavourites ] =  useState([]);
  const favouritesRef = collection(db, 'favourites')

  useEffect(() => {
    const unsubscribe = onSnapshot(favouritesRef, (snapshot) => {
      const favs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavourites(favs);
    });

    return () => unsubscribe();
  }, []);

  const handleRemove = async (id) => {
  await deleteDoc(doc(db, "favourites", id));
  };

  return (
    <div className="favourites ">
      <h2 className = 'text-center font-sans text-xl m-10'>Your Favourites</h2>
      {favourites.length === 0 ? (
        <p>No Favourite Movies Yet</p>
      ) : (
        <div className="movies-grid flex items-center justify-center gap-10">
          {favourites.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              isFavourite = {true}
              onRemove={() => handleRemove(movie.id)}
              
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;


