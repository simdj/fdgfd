import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

function Detail(){
    // const params = useParams()
    // return <h1>Details: {params.id}</h1>
    const {id} = useParams()


    const [loading, set_loading] = useState(true);
    const [detail, set_detail] = useState([]);

    const getMovieDetail = async() => {
        const json = await (
            await fetch(
                // "https://yts.mx/api/v2/movie_details.json?movie_id="+id
                `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
            )
        ).json();

        set_detail(json.data)
        set_loading(false);

    }


    useEffect(()=>{
        getMovieDetail();
    }, []) // 한번만 호출되도록

    
    console.log(detail)


    return <div>
        <h1>Details: {id}</h1>
        </div>
}

export default Detail