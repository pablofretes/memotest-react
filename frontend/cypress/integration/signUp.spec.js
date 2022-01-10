/* eslint-disable no-undef */
describe('sign Up', function (){
    const username = 'testing123';
    const password = 'secret123';

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.waitForReact();
    })

    it('sign Up throws error if username/password are shorter than 4 characters', function (){
        cy.get('[data-cy=signUp-button]').click();
        cy.react('TextField', { props: { field: { name: 'username' } } }).type('123');
        cy.react('TextField', { props: { field: { name: 'password' } } }).type('123');
        cy.react('TextField', { props: { field: { name: 'passwordConfirmation' } } }).type('123');
        cy.contains('Username must contain at least 4 characters');
        cy.contains('Password must contain at least 4 characters');
    });

    it('sign Up fails when username already exists', function (){
        cy.get('[data-cy=signUp-button]').click();
        cy.react('TextField', { props: { field: { name: 'username' } } }).type(username);
        cy.react('TextField', { props: { field: { name: 'password' } } }).type(password);
        cy.react('TextField', { props: { field: { name: 'passwordConfirmation' } } }).type(password);
        cy.get('[data-cy=button-signUp]').click();
        cy.contains('There was an error creating your account');
    });

    it('login doesnt work with incorrect credentials', function() {
        cy.get('[data-cy=login-button]').click();
        cy.react('TextField', { props: { field: { name: 'username' } } }).type('123');
        cy.react('TextField', { props: { field: { name: 'password' } } }).type('123');
        cy.contains('Username must contain at least 4 characters');
    });

    it('logout button works, and login works with correct credentials', function() {
        cy.get('[data-cy=login-button]').click();
        cy.react('TextField', { props: { field: { name: 'username' } } }).type(username);
        cy.react('TextField', { props: { field: { name: 'password' } } }).type(password);
        cy.get('[data-cy=login-form-button]').click();
        cy.wait(2000);
        cy.contains(`You have successfully logged-in!`);
        cy.get('[data-cy=logout-button]').click();
        cy.get('[data-cy=login-button]').click();
    });
})