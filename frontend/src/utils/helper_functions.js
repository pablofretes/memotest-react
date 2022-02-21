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

export const difficultySwitch = (difficulty, setter, functionDiff, easy, normal, hard ) => {
	switch (difficulty) {
		case 'easy': 
			setter(functionDiff(easy));
			break;
		case 'normal':
			setter(functionDiff(normal));
			break;
		case 'hard':
			setter(functionDiff(hard));
			break;
		default:
			setter(functionDiff(hard));
			break;
	}
};

export const sortingFunction = (array) => {

	let sortedScores = [...array].sort((a, b) => {
    if(a.turns === b.turns){
      return a.timeCount - b.timeCount;
    };
    return a.turns > b.turns ? 1 : - 1;
  });

	return sortedScores;
}