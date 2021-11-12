it('should click user page and find billy bob and toggle role.', () => {
  cy.visit('/');
  cy.findByTestId('nav.users').click();
  cy.findByText(/billybob@fake\.com/i).click();
  cy.findByRole('button', {
    name: /toggle role/i,
  }).click();

  cy.findByText(/change role successful/i);
});
