import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import './PokedexPage.css'
import Header from '../components/Header/Header'
import { useNavigate } from "react-router-dom"

const PokedexPage = () => {
  const PAGE_SIZE = 12;

  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [typeSelected, setTypeSelected] = useState('allPokemons');
  const URL = `https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`;
  const [response, getAllPokemons, getPokemonsByType, error] = useFetch(URL);
  const trainerName = useSelector(states => states.trainer);

  useEffect(() => {
    if (typeSelected === 'allPokemons') {
      getAllPokemons();
    } else {
      getPokemonsByType(typeSelected);
      setPage(1);
    }

  }, [typeSelected]);

  const inputName = useRef();

  const handleSearch = e => {
    e.preventDefault()
    setInputValue(inputName.current.value.trim().toLowerCase())
  }

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/`);
  }

  const renderPokemonCards = () => {
    if (!response) {
      return;
    }

    let pokemons = response?.results.filter(filterPokemonsByName);

    const start = (page - 1) * PAGE_SIZE;
    const end = page * PAGE_SIZE;
    pokemons = pokemons.slice(start, end);

    if (pokemons.length > 0) {
      return (
        <div className="poke_cards">
          {
            pokemons.map(pokemon => (
              <PokeCard key={pokemon.url} url={pokemon.url} />
            ))
          }
        </div>
      );
    }
    return <p className="error_msg">No pokemon found with that <span className="message_error" >name</span>.</p>;
  }

  const filterPokemonsByName = (pokemon) => pokemon.name.toLowerCase().includes(inputValue);

  const nextPage = () => {

    const pokemons = response?.results.filter(filterPokemonsByName);
    const totalPages = Math.ceil(pokemons.length / PAGE_SIZE);
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  const previousPage = () => {

    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    <>
      <Header />
      <button className="poke_back_button" onClick={handleNavigate}>←  BACK</button>
      <div className="poke_one_container">
        <div>
          <h2 className="poke_one_hi" >Hi <span className="poke_one_name" >{trainerName}</span>, here you can find your favorite pokemon</h2>
          <div className="poke_input_container">
            <form className="poke_form" onSubmit={handleSearch}>
              <input placeholder="Enter pokemon name" className="poke_one_input" ref={inputName} type="text" />
              <button onClick={handleSearch} className="poke_one_button" >Searh</button>
            </form>
            <SelectType setTypeSelected={setTypeSelected} />
          </div>
        </div>
        {
          <div className="poke_cards">
            {renderPokemonCards()}
          </div>
        }
        <div className="pagination">
          <button className="previous_button" onClick={previousPage}>Previous</button>
          <button className="next_button" onClick={nextPage}>Next</button>
        </div>
      </div>
    </>
  )
}

export default PokedexPage