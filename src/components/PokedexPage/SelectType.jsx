import { useEffect, useRef } from "react"
import useFetch from "../../hooks/useFetch"
import './SelectType.css'

const SelectType = ({ setTypeSelected }) => {

    const url = 'https://pokeapi.co/api/v2/type'
    const [types, getTypes] = useFetch(url)

    useEffect(() => {
        getTypes()
    }, [])

    const typeRef = useRef()

    const handleChange = e => {
        setTypeSelected(typeRef.current.value)
    }

    return (
        <select ref={typeRef} onChange={handleChange}>
            <option value='allPokemons'>All Pokemons</option>
            {
                types?.results.map(type => (
                    <option key={type.url} value={type.url}>{type.name}</option>
                ))

            }

        </select>
    )
}

export default SelectType