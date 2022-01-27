describe('Memotest', function (){

    beforeEach(function () {
        cy.visit('http://localhost:3000');
    });

    it('front page and leaderboard can be opened', function () {
        cy.get('[data-cy=leaderboard-button]').click();
        cy.get('[data-cy=leaderboard]');
        cy.get('[data-cy=home-button]');
    });

    it('play button leads to memotest', function () {
        cy.get('[data-cy=play-button]').click();
        cy.get('[data-cy=pikachu-1-container]');
        cy.get('[data-cy=pikachu-2-container]');
        cy.get('[data-cy=charizard-1-container]');
        cy.get('[data-cy=dragonair-1-container]');
        cy.get('[data-cy=dragonair-2-container]');
        cy.get('[data-cy=charizard-2-container]');
    });

    it('should have 20 clickable blocks', function () {
        cy.get('[data-cy=play-button]').click();
        cy.get('.useless').should('have.length', 20);
    })

    it('solving game', function () {
        cy.get('[data-cy=play-button]').click();
        let pairsMap;
        let pairsList;
        cy.get('.useless').then(cuadros => {
            console.log(cuadros);
            pairsMap = getPairs(cuadros);
            pairsList = Object.values(pairsMap);

            pairsList.forEach(par => {
                cy.get(par[0]).click();
                cy.get(par[1]).click();
            });
        });
        cy.get('[data-cy=replay-modal]').should('be.visible').contains('You Win! Do You Want To Play Again?');
    });
});

const getPairs = (list) => {
    const pairs = {};

    list.each((i, block) => {
        console.log(block);
        const pokemonBlock = block.name.substring(0, block.name.length - 2);
        console.log(pokemonBlock);
        if(pairs[pokemonBlock]){
            pairs[pokemonBlock].push(block);
        } else {
            pairs[pokemonBlock] = [block];
        };
    });
    console.log(pairs);
    return pairs;
};