import { Button } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { contains } from 'cypress/types/jquery';
describe('Testing interactions with users on the Admin page', () => {
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

    cy.visit('/');
    cy.findByRole('textbox', {
      name: /email/i,
    }).type(username, { log: false });
    cy.findByLabelText(/password/i).type(password, { log: false });
    cy.findByRole('button', {
      name: /submit/i,
    }).click();
    cy.findByTestId('nav.users').should('be.visible');
  });

  it('should click devices in navigation and display a list of 10 sections', () => {
    cy.findByTestId('nav.users').click();
    localStorage.getItem('token');
    cy.findAllByTestId('user.list.divider').children().should('be.length', 10);

    cy.findAllByTestId('user.list.divider').contains('O');
  });
  it('should click on Roberto Davidson and check is that isRole is set to Admin', () => {
    cy.findByTestId('nav.users').click();

    cy.findAllByTestId('user.list').contains('Roberto Davidson').click();

    cy.findByTestId('details.table.user').children().find('.testIsRoleUser').contains('admin');
  });
  it('should click on Delete button to delete user and after to restore the user back', () => {
    cy.findByTestId('BtnDelete').children().click();
    cy.contains('OK').click();
    cy.findByTestId('RestoreUser').click();
    cy.findAllByText('Restore').click();
  });
});
