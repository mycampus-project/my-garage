describe('Testing interactions with devices on the Admin page', () => {
  const username = Cypress.env('username');
  const password = Cypress.env('password');

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
    cy.findByTestId('nav.devices').should('be.visible');
  });

  it('should click devices in navigation and display a list of 11 items', () => {
    cy.findByTestId('nav.devices').click();
    cy.findByTestId('deviceList').should('be.visible');
  });

  it('should click on 3D Printer -3 and check is that isAvailable is set to Unavailable', () => {
    cy.findByTestId('nav.devices').click();

    cy.findByTestId('deviceList').contains('3D Printer - 3').click();

    cy.findByTestId('details.table')
      .children()
      .find('.testIsAvailableItem')
      .contains('Unavailable');
  });

  it('should click on Edit button and show modal. Test to see if OK button is disabled', () => {
    cy.findByTestId('edit.device.btn').should('be.visible').click();
    const modalContent = cy
      .findByTestId('edit.device.modal')
      .children('.ant-modal-wrap')
      .find('.ant-modal-content');

    modalContent.children('.ant-modal-footer').contains('OK').should('be.disabled');
    cy.findByTestId('edit.form').should('be.visible');
  });
});
