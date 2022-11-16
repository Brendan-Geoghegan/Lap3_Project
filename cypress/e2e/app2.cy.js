describe("starting a new game", () => {
    it("opens homepage successfully", () => {
      cy.visit("http://localhost:3000/");
    });
  
    it("user opens create room", () => {
      cy.get(":nth-child(2) > .ui").click();
      cy.get('[type="text"]').clear().type("mc");
      cy.get('[name="category"]').select("Animals");
      cy.get('[name="difficulty"]').select("Medium");
      cy.get('[type="submit"]').click();
    });
  
    it("returns to the home page", () => {
      cy.get(".back-btn").click();
      cy.wait(500);
      cy.get(".back-btn").click();
    });
  });
  
  describe("user joining a room", () => {
    it("opens homepage successfully", () => {
      cy.visit("http://localhost:3000/");
    });
  
    it("successfully opens join room", () => {
      cy.get(":nth-child(1) > .ui").click();
      cy.get('[placeholder="Enter Room..."]').type("1");
      cy.get('[placeholder="Enter Username..."]').type("Dave");
      cy.get('[type="submit"]').click();
    });
  
    it("returns to the home page", () => {
      cy.get(".back-btn").click();
      cy.wait(500);
      cy.get(".back-btn").click();
    });
  });
  
  describe("multiplayer function", () => {
    it("opens homepage successfully", () => {
      cy.visit("http://localhost:3000/");
    });
  
    it("opens create room", () => {
      cy.get(":nth-child(2) > .ui").click();
      cy.get('[type="text"]').type("mc");
      cy.get('[name="category"]').select("Animals");
      cy.get('[name="difficulty"]').select("Medium");
      cy.get('[type="submit"]').click();
    });
  
    it("joins waiting room", () => {
      cy.get("h2").then(($roomnumber) => {
        const roomnumber = $roomnumber.text();
  
        cy.get(".back-btn").click();
        cy.wait(500);
        cy.get(".back-btn").click();
  
        cy.get(":nth-child(1) > .ui").click();
        cy.get('[placeholder="Enter Room..."]').type(roomnumber);
        cy.get('[placeholder="Enter Username..."]').type("Dave");
        cy.get('[type="submit"]').click();
      });
    });
  });

  describe("user accesses leaderboard", () => {
    it("successfully opens leaderboard", () => {
      cy.get('[href="/leaderboard"] > .ui').click();
      cy.get(".leaderboard");
    });
  
    it("returns to the home page", () => {
      cy.get(".back-btn").click();
    });
  });
