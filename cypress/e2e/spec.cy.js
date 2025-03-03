describe('Tic Tac Toe testing', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173')
  });

  it('should ensure the Tic-Tac-Toe board is initially empty and X is the first player.', () => {
    cy.get('[data-testid="status"]').should('contain', 'Next player: X')
    cy.get('.square').should('have.length', 9);
    cy.get('.square').each($square => {
      cy.wrap($square).should('be.empty');
    });
  });

  it('should players move alternately', () => {
    cy.get('[data-testid="square-0"]').click();
    cy.get('[data-testid="square-0"]').should('contain', 'X');
    cy.get('[data-testid="status"]').should('contain', 'Next player: O');
    
    cy.get('[data-testid="square-5"]').click();
    cy.get('[data-testid="square-5"]').should('contain', 'O');
    cy.get('[data-testid="status"]').should('contain', 'Next player: X');
  });

  it('should declare a winner when three in a row', () => {
    cy.get('[data-testid="square-0"]').click(); //X
    cy.get('[data-testid="square-1"]').click();
    cy.get('[data-testid="square-3"]').click(); //X
    cy.get('[data-testid="square-4"]').click();
    cy.get('[data-testid="square-6"]').click(); //X

    cy.get('[data-testid="status"]').should('contain', 'Winner: X');
    
  });

  it('should reset the game when reset button is clicked', () => {
    cy.get('[data-testid="square-0"]').click(); //X
    cy.get('[data-testid="square-1"]').click();
    cy.get('[data-testid="square-3"]').click(); //X
    cy.get('[data-testid="square-4"]').click();
    cy.get('[data-testid="square-6"]').click(); //X

    cy.get('[data-testid="status"]').should('contain', 'Winner: X');

    cy.get('[data-testid="reset-button"]').click();
    cy.get('.square').each($square => {
      cy.wrap($square).should('be.empty');
    });
  });

  it('should not allow playing on the same square twice', () => {
    cy.get('[data-testid="square-0"]').click();
    cy.get('[data-testid="status"]').should('contain', 'Next player: O');
 
    cy.get('[data-testid="square-0"]').click();
    cy.get('[data-testid="status"]').should('contain', 'Next player: O');
  })
})