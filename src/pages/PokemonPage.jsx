import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import './PokemonPage.css'
import Header from '../components/Header/Header'
import { useNavigate } from "react-router-dom"

const PokemonPage = () => {

  const { id } = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const [pokemon, getPokemon] = useFetch(url)


  useEffect(() => {
    getPokemon()
  }, [])

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/pokedex`)
  }
  return (
    <>
      <Header />
      <button className="poke_back_button" onClick={handleNavigate}>←  BACK</button>
      <div className={`pokemon_card ${pokemon?.types[0].type.name}`}>
        <div className={`pokemon_img_container ${pokemon?.types[0].type.name}`}>
          <img className="pokemon_img" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
        </div>
        <h2 className={`pokemon_number ${pokemon?.types[0].type.name}`} >#{pokemon?.id}</h2>
        <h2 className={`pokemon_name ${pokemon?.types[0].type.name}`}>{pokemon?.name}</h2>
        <div className="pokemon_container_wh">
          <div className="pokemon_weight_title">Weight
            <span>{pokemon?.weight}</span>
          </div>
          <div className="pokemon_height_title">Height
            <span>{pokemon?.height}</span>
          </div>
        </div>
        <div className="pokemon_contaimer_ts">
          <div className="pokemon_type_container">
            <h3 className={`pokemon_ts_title ${pokemon?.types[0].type.name}`}>Type</h3>
            <div className="pokemon_types">
              {
                pokemon?.types.map((type, i) => <span key={i} className={`pokemon_type ${type.type.name}`}>{type.type.name}</span>)
              }
            </div>
          </div>
          <div className="pokemon_skill_container">
            <h3 className={`pokemon_ts_title ${pokemon?.types[0].type.name}`}>Skills</h3>
            <div className="pokemon_abilities">
              {
                pokemon?.abilities.map((a, i) => <span key={i} className="pokemon_ability">{a.ability.name}</span>)
              }
            </div>
          </div>
        </div>
        <div className="pokemon_stats_container" >
          <h2 className="pokemon_stats_title">Stats</h2>
          {pokemon?.stats.map((s) =>
            <>
              <div className="pokemon_stat_container">
                <span className="pokemon_stat_label">{s.stat.name}:</span>
                <span className="pokemon_stat_value">{s.base_stat}/150</span>
              </div>
              <div className="pokemon_stat_chart_container">
                <div className="pokemon_stat_chart" style={{ width: `${Math.floor((s.base_stat / 150) * 100)}%` }}></div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={`pokemon_movements_container ${pokemon?.types[0].type.name}`} >
        <h2 className="pokemon_movements_title">Movements</h2>
        <div className="pokemon_movements" >
          {
            pokemon?.moves.map((move, i) => <span key={i} className="pokemon_movement">{move.move.name}</span>)
          }
        </div>
      </div>
    </>
  )
}

export default PokemonPage
