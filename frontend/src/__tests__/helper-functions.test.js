import { pokemonImages } from "../utils/pokemonImages.js";
import { isEmpty, formatCounter, doublePokemons } from "../utils/helper_functions.js";
import '@testing-library/jest-dom/extend-expect';

describe('Functions work as expected', () => {
    it('isEmpty returns true if the object is empty', () => {
        const object = {};
        const emptyTest = isEmpty(object);

        expect(emptyTest).toEqual(true);
    });

    it('isEmpty returns false if the object is not empty', () => {
        const object = { something: "something" };
        const emptyTest = isEmpty(object);

        expect(emptyTest).toEqual(false);
    });

    it('formatCounter returns a string', () => {
        const formatTest = formatCounter(9);

        expect(typeof formatTest).toBe('string');
    });

    it('formatCounter returns a 0 before the rest of the string if the string length is < 2', () => {
        const formatTest = formatCounter(9);
        
        expect(formatTest).toEqual('09');
    });
    
    it('formatCounter returns a string equal to the integer provided if the string length is > 2', () => {
        const formatTest = formatCounter(37);
        
        expect(formatTest).toEqual('37');
    });

    it('formatCounter returns null if the parameter provided is not a number', () => {
        const formatTest = formatCounter({ something: 'something' });
        
        expect(formatTest).toEqual(null);
    });

    it('after doubling an array there should be 2 of each item, with an additional key called key', () => {
        const array = [...pokemonImages];
        const firstElement = {
            name: array[0].name,
            img: array[0].img,
            key: `${array[0].name}-1`
        };
        const shuffleTest = doublePokemons(array);

        expect(shuffleTest).toHaveLength(array.length*2);
        expect(shuffleTest).toEqual(expect.arrayContaining([firstElement]));
    });

    it('after doubling an array the array must be shuffled', () => {
        const array = [...pokemonImages];
        const firstElement = {
            name: array[0].name,
            img: array[0].img,
            key: `${array[0].name}-1`
        };

        const shuffleTest = doublePokemons(array);

        expect(shuffleTest[0]).not.toEqual(firstElement);
    });
})