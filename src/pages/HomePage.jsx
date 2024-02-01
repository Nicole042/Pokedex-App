import { useRef, useState } from "react"
import { setTrainerG } from "../store/states/trainer.state"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

const HomePage = () => {
  const inputTrainer = useRef();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault();

    const inputValue = inputTrainer.current.value.trim();

    if (inputValue.length < 3) {
      setError(true)
    } else {
      dispath(setTrainerG(inputTrainer.current.value.trim()));
      navigate('/pokedex');
      setError(false)
    }
  }


  return (
    <>
      <div className="home_conatiner">
        <img className="home_img" src="/imagenPokedex.jpeg" alt="Logo pokedex" />
        <h2 className="home_greetings" >Hi trainer!</h2>
        <p className="home_paragraph" >To start this app, give me your trainer name </p>
        <form onSubmit={handleSubmit}>
          <input className="home_input" ref={inputTrainer} type="text" />
          <button className="home_button">START</button>
        </form>
        {error ? <span className="message_error_home">Input needs to be atleast 3 characters long</span> : <></>}
      </div>
      <footer className="home_footer" >
        <div className="home_footer_red"></div>
        <div className="home_footer_black" ></div>
        <div className="home_footer_img">
          <div className="black1 circle">
            <div className="white circle">
              <div className="black2 circle"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default HomePage