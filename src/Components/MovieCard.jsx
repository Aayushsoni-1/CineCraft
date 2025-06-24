import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function MovieCard({ movie, onRemove, isFavourite: isFavouriteProp }) {
  const [isFavourite, setIsFavourite] = useState(false);

  // Handle initial mount
  useEffect(() => {
    const checkIfFavourite = async () => {
      // Use the prop if it's explicitly passed (like from Favourites.jsx)
      if (isFavouriteProp !== undefined) {
        setIsFavourite(isFavouriteProp);
        return;
      }

      try {
        const q = query(
          collection(db, "favourites"),
          where("movieId", "==", movie.id)
        );
        const snapshot = await getDocs(q);
        setIsFavourite(!snapshot.empty);
      } catch (err) {
        console.error("Error checking favourite:", err);
      }
    };

    checkIfFavourite();
  }, [movie.id, isFavouriteProp]);

  // Toggle add/remove favourite
  const toggleFavourite = async () => {
    const favsRef = collection(db, "favourites");

    if (isFavourite) {
      const q = query(favsRef, where("movieId", "==", movie.movieId || movie.id));
      const snapshot = await getDocs(q);
      snapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "favourites", docSnap.id));
      });
      setIsFavourite(false);
      if (onRemove) onRemove(); // Only triggers in Favourites.jsx
    } else {
      await addDoc(favsRef, {
        movieId: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      });
      setIsFavourite(true);
    }
  };

  return (
    <div className="movieCard bg-white border border-gray-300 rounded-xl w-60 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-[450px] hover:cursor-pointer">
      <div className="moviePoster relative h-[350px] ">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div className="movieOverlay absolute top-2 right-2">
          <button
            className={`text-2xl bg-transparent border-none cursor-pointer hover:scale-110 transition-transform`}
            onClick={toggleFavourite}
          >
            {isFavourite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
      <div className="movieInfo p-4 text-center flex-1 flex flex-col justify-center">
        <h3 className="text-lg">{movie.title}</h3>
        <p className="text-sm text-gray-500">{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
