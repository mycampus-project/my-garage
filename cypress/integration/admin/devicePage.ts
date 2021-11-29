describe('Testing interactions with devices on the Admin page', () => {
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
    cy.findByTestId('nav.devices').should('be.visible');
  });

  it('should click devices in navigation and display a list of 5 sections', () => {
    cy.findByTestId('nav.devices').click();
    localStorage.getItem('token');
    cy.findAllByTestId('device.list').children().should('be.length', 5);

    cy.findAllByTestId('device.list.divider').contains('Printer');
  });

  it('should click on 3D Printer -3 and check is that isAvailable is set to Unavailable', () => {
    cy.findByTestId('nav.devices').click();

    cy.findAllByTestId('device.list').contains('3D Printer - 3').click();

    cy.findByTestId('details.table')
      .children()
      .find('.testIsAvailableItem')
      .contains('Unavailable');
  });

  it('should click on Edit button and show modal. Test to see if OK button is disabled and form is displayed', () => {
    cy.findByTestId('edit.device.btn').should('be.visible').click();
    cy.findByTestId('device.form').should('be.visible');
    cy.findByTestId('device.form').find('button').contains('Submit').should('not.be.disabled');
  });

  it('should toggle isAvailable and update device when OK is clicked.', () => {
    cy.findByTestId('isAvailable.toggle').children().find('button').click();

    cy.findByTestId('device.form').find('button').contains('Submit').click();

    cy.findByTestId('details.table')
      .children()
      .find('.testIsAvailableItem')
      .children('td > span')
      .should('have.text', 'Available');
  });
});
