describe('Admin webpage test suite', () => {
  // Test admin User Login
  it('should login into page as admin', () => {
    cy.visit('/');
    cy.findByRole('textbox', {
      name: /email/i,
    }).type('sahar.nagar@nokia.com');
    cy.findByLabelText(/password/i).type('testtest');
    cy.findByRole('button', {
      name: /submit/i,
    }).click();
    cy.findByTestId('nav.users').should('be.visible');
  });

  // Test to select users tab and click user
  it('should select users on navigation and select BillyBob from list', () => {
    cy.findByTestId('nav.users').click();
    cy.findByText(/billybob@fake\.com/i).click();
    cy.findByRole('cell', {
      name: /billybob@fake\.com/i,
    }).should('be.visible');
  });

  // Test to see if successful notification bar displays from toggle role button
  it('should click toggle role button and display successful notification bar', () => {
    cy.findByRole('button', {
      name: /toggle role/i,
    }).click();
    cy.findByText(/change role successful/i).should('be.visible');
  });
});
