const shufflePokemons = (array) => {
    
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };

  return array;
};

export const doublePokemons = (array) => {
  let doublePokemons = [];

  array.forEach(pokemon => doublePokemons.push({ name: pokemon.name, img: pokemon.img, key: `${pokemon.name}-1`}));
  array.forEach(pokemon => doublePokemons.push({ name: pokemon.name, img: pokemon.img, key: `${pokemon.name}-2`}));

  const shuffled = shufflePokemons(doublePokemons);

  return shuffled;
};

export const formatCounter = (timeValue) => {
  if(typeof timeValue !== 'number'){
    return null;
  };

  let timeValueString = timeValue + '';
  if(timeValueString.length < 2) {
    return '0' + timeValueString;
  } else {
    return timeValueString;
  };
};

export const isEmpty = (obj) => {
  if(Object.entries(obj).length === 0){
      return true;
  };
  return false;
};