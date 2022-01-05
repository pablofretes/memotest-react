import { useState, useEffect } from "react";
import { doublePokemons } from "./utils/helper_functions";
import { SAVE_SCORE } from './mutations';
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';

const useMemotest = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState(doublePokemons);
  const [clickedBlocks, setClickedBlocks] = useState([]);
  const [paired, setPaired] = useState([]);
  const [turn, setTurn] = useState(0);
  const [open, setOpen] = useState(false);
  const [saveScore, result] = useMutation(SAVE_SCORE);
  const [score, setScore] = useState([]);
  const [token, setToken] = useState(null);
  const [counter, setCounter] = useState(0);

  const countUp = () => {
    setCounter(counter => counter + 1);
  };
  
  let interval;

  const timeInterval = () => {
    interval = setInterval(countUp, 1000);
  };

  const stopInterval = () => {
    return clearInterval(interval);
  };

  useEffect(() => {
    if(clickedBlocks.length === 2){
      const firstPokemon = clickedBlocks[0].substring(0, clickedBlocks[0].length - 2);
      const secondPokemon = clickedBlocks[1].substring(0, clickedBlocks[1].length - 2);

      if(firstPokemon === secondPokemon){
        setPaired([...paired, firstPokemon]);
        setClickedBlocks([]);
      } else {
        setTimeout(() => {
          setClickedBlocks([]);
        }, 1000);
      };
      setTurn(turn => turn + 1);
    };

    if(paired.length === images.length / 2){
      setOpen(true);
      if(token){
        saveScore({ variables: { timeCount: counter, turns: turn } });
      };
      stopInterval();
    };
    // eslint-disable-next-line
  }, [clickedBlocks, paired]);

  useEffect(() => {
    if(result.data) {
      setScore([result.data]);
    };
  }, [result.data]);

  const handleClicks = (pokemon) => {
    if(!clickedBlocks.includes(pokemon) && clickedBlocks.length < 2) {
      setClickedBlocks([...clickedBlocks, pokemon]);
    };
  };

  const reset = () => {
    setImages(doublePokemons);
    setPaired([]);
    setOpen(false);
    setTurn(0);
    setCounter(0);
    timeInterval();
    navigate('/memotest');
  };

  if(paired.length === images.length / 2){
    stopInterval();
  };

  return { images, handleClicks, clickedBlocks, paired, turn, open, setOpen, score, token, setToken, counter, reset };
};

export default useMemotest;