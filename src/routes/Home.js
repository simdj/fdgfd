import {useState, useEffect} from "react"
import Movie from "../components/Movie"

function Home(){
    const [loading, set_loading] = useState(true);
    const [movies, set_movies] = useState([]);
    // useEffect(() => {
    //   fetch(
    //     "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
    //   )
    //     .then((res) => res.json())
    //     .then((json) => {
    //       set_movies(json.data.movies);
    //       set_loading(false);
    //     });
    // }, []);
  
    const getMovies = async () => {
      // await 절차적으로
      // const res = await fetch(
      //   "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
      // );
      // const json = await res.json();
  
      // 더 축약하면!
      const json = await (
        await fetch(
          "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
        )
      ).json();
  
      set_movies(json.data.movies);
      set_loading(false);
    };
    useEffect(() => {
      getMovies();
    }, []);
    console.log(movies);
    return (
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            {movies.map((movie) => (
            <Movie key={movie.id} id={movie.id} cover_img={movie.medium_cover_image} title={movie.title} summary={movie.summary} genres={movie.genres}/>
            ))}
          </div>
        )}
      </div>
    );
}


export default Home;