import { Children } from 'react';

describe('Testing interactions with users on the TimeBooking page', () => {
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  // Test admin User Login
  it('should login into page as admin', () => {
    expect(username, 'username was set').to.be.a('string').and.not.be.empty;
    // but the password value should not be shown
    if (typeof password !== 'string' || !password) {
      throw new Error('Missing password value, set using CYPRESS_password=...');
    }

    cy.visit('localhost:8081');
    cy.findByRole('textbox', {
      name: /email/i,
    }).type(username, { log: false });
    cy.findByLabelText(/password/i).type(password, { log: false });
    cy.findByRole('button', {
      name: /submit/i,
    }).click();
    cy.findByTestId('newBooking').should('be.visible');
  });
  it('should click devices in navigation and display a list of 5 sections', () => {
    cy.findByTestId('newBooking').click();
    localStorage.getItem('token');
    cy.findAllByTestId('newBookingDivider').children().should('be.length', 5);

    cy.findAllByTestId('newBookingDivider').contains('Room');
  });
  it('make new booking and also deletes it later', () => {
    cy.findByTestId('newBooking').click();
    localStorage.getItem('token');
    cy.findAllByTestId('newBookingDivider').children();
    cy.contains('3D Printer - 3').click();
    cy.findAllByTestId('DatePicker');
    cy.contains('19:00');
    cy.get('table  >tbody >tr td:nth-child(6)');
    cy.get('tbody>tr td:nth-child(6)').eq(30).dblclick();
    cy.findByText('Book').click();
    cy.findByText('Cancel').click();
    cy.findByText('Yes').click();
  });
});
