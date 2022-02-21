import { useState, useEffect } from "react";
import { difficultySwitch, doublePokemons } from "./utils/helper_functions";
import { SAVE_SCORE } from './mutations';
import { useMutation } from "@apollo/client";
import { pokemonImages } from './utils/pokemonImages';
import { LEADERBOARD } from './queries';

const useMemotest = () => {
  const [images, setImages] = useState([]);
  const [clickedBlocks, setClickedBlocks] = useState([]);
  const [paired, setPaired] = useState([]);
  const [turn, setTurn] = useState(0);
  const [open, setOpen] = useState(false);
  const [saveScore, result] = useMutation(SAVE_SCORE, {
    refetchQueries: [ { query: LEADERBOARD }]
  });
  const [token, setToken] = useState(null);
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [show, setShow] = useState(null);
	const [difficulty, setDifficulty] = useState('');

	const easyDifficulty = [pokemonImages[0], pokemonImages[1], pokemonImages[2], pokemonImages[3], pokemonImages[4], pokemonImages[5]];
	const normalDifficulty = [pokemonImages[0], pokemonImages[1], pokemonImages[2], pokemonImages[3], pokemonImages[4], pokemonImages[5], pokemonImages[6], pokemonImages[7]];

  const countUp = () => {
    setCounter(counter => counter + 1);
  };
  
  useEffect(() => {
    if(clickedBlocks.length === 2){
      //IF 2 IMAGES ARE CLICKED WE CHECK IF THEY ARE OF THE SAME POKEMON
      const firstPokemon = clickedBlocks[0].substring(0, clickedBlocks[0].length - 2);
      const secondPokemon = clickedBlocks[1].substring(0, clickedBlocks[1].length - 2);

      if(firstPokemon === secondPokemon){
        //IF THEY ARE, THEN THOSE ARE MARKED AS PAIRED AND ADDED TO THE paired STATE ARRAY
        //THE clickedBlocks STATE ARRAY GOES BACK TO BEING EMPTY
        setPaired([...paired, firstPokemon]);
        setClickedBlocks([]);
      } else {
        setTimeout(() => {
          setClickedBlocks([]);
        }, 1000);
      };
      //EVERY 2 CLICKS IS A TURN
      setTurn(turn => turn + 1);
    };

    if(paired.length === images.length / 2){
      //THERE ALWAYS ARE HALF THE AMOUNT OF PAIRS AS THERE ARE IMAGES WHEN THE GAME IS OVER
      //IF THERE IS A LOGGED IN USER WE SAVE THEIR SCORE AND OPEN A MODAL
      setOpen(true);
      if(token){
				console.log(difficulty);
        saveScore({ variables: { timeCount: counter, turns: turn, difficulty: difficulty } });
      };
      //TIMER IS STOPPED
      setIsRunning(false)
    };
    // eslint-disable-next-line
  }, [clickedBlocks, paired]);

  useEffect(() => {
    let interval;
    if(isRunning){
      interval = setInterval(countUp, 1000);
    };
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if(show){
      setTimeout(() => {
          setShow(null);
      }, 1000)
    }
  }, [show]);

	useEffect(() => {
		difficultySwitch(difficulty, setImages, doublePokemons, easyDifficulty, normalDifficulty, pokemonImages);
	}, [difficulty])

  const handleClicks = (pokemon) => {
    if(!clickedBlocks.includes(pokemon) && clickedBlocks.length < 2) {
      setClickedBlocks([...clickedBlocks, pokemon]);
    };
  };

  const reset = () => {
		difficultySwitch(difficulty, setImages, doublePokemons, easyDifficulty, normalDifficulty, pokemonImages);
    setShow(true)
    setPaired([]);
    setOpen(false);
    setTurn(0);
    setCounter(-1);
    setIsRunning(true);
    setDisabled(false);
  };

  return { images, handleClicks, clickedBlocks, paired, turn, open, setOpen, token, setToken, counter, reset, disabled, show, setDifficulty, difficulty };
};

export default useMemotest;