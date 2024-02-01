import { useState } from "react"
import axios from 'axios'

const useFetch = url => {
    const [hasError, setHasError] = useState(false);
    const [response, setResponse] = useState();

    const getPokemons = (name) => {
        axios.get(url)
            .then(res => {
                setResponse(res.data);
                setHasError(false);
            })
            .catch(err => {
                console.log(err);
                setHasError(true);
            })
    }

    const getPokemonsByType = (urlType) => {
        axios.get(urlType)
            .then(res => {
                const obj = {
                    results: res.data.pokemon.map(pokeInfo => pokeInfo.pokemon)
                }
                setResponse(obj)
                setHasError(false)
            })
            .catch(err => {
                setHasError(true)
                console.log(err)
            })
    }


    return [response, getPokemons, getPokemonsByType, hasError]
}

export default useFetch