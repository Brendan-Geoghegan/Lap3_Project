describe("user creating a room", () => {

  it("opens homepage successfully", () => {
      cy.visit("http://localhost:3000/");
  });

    it("user opens create room", () => {
      cy.get(':nth-child(2) > .ui').click();
      cy.get('[type="text"]').clear().type('mc');
      cy.get('[name="category"]').select('Animals');
      cy.get('[name="difficulty"]').select('Medium');
      cy.get('[type="submit"]').click();
  });

    it("returns to the home page", () => {
      cy.get('.back-btn').click();
      cy.wait(500)
      cy.get('.back-btn').click();
    })
});

describe("user joining a room", () => {

  it("opens homepage successfully", () => {
      cy.visit("http://localhost:3000/");
  });

    it("successfully opens join room", () => {
      cy.get(':nth-child(1) > .ui').click();
      cy.get('[placeholder="Enter Room..."]').type('1')
      cy.get('[placeholder="Enter Username..."]').type('Dave');
      cy.get('[type="submit"]').click();
  });

  it("returns to the home page", () => {
    cy.get('.back-btn').click();
      cy.wait(500)
      cy.get('.back-btn').click();
  })
});

describe("user accesses leaderboard", () => {
  
  it("successfully opens leaderboard", () => {
    cy.get('[href="/leaderboard"] > .ui').click();
    cy.get('.leaderboard');
        });
  
  it("returns to the home page", () => {
          cy.get('.back-btn').click();
        })
})

describe("multiplayer function", () => {

  it("opens homepage successfully", () => {
      cy.visit("http://localhost:3000/");
  });

    it("user opens create room", () => {
      cy.get(':nth-child(2) > .ui').click();
      cy.get('[type="text"]').clear().type('');
      cy.get('[name="category"]').select('Animals');
      cy.get('[name="difficulty"]').select('Medium');
      cy.get('[type="submit"]').click();
      cy.get('h2').then(($h2) => {
        const text = $h2.text()
      })
  });

//     it("returns to the home page", () => {
//       cy.get('.back-btn').click();
//       cy.wait(500)
//       cy.get('.back-btn').click();
//     })

//     it("successfully opens join room", () => {
//       cy.get(':nth-child(1) > .ui').click();
//       cy.get('[placeholder="Enter Room..."]').type('1')
//       cy.get('[placeholder="Enter Username..."]').type('Dave');
//       cy.get('[type="submit"]').click();
//   });
// });



//   it("Go Back To Login", () => {
//       cy.get(".login-btn").click();
//   });

//   it("Unsuccessful Login Attempt", () => {
//       cy.visit("https://monasteri.netlify.app/index.html");
//       cy.get("#username").type("wrong username");
//       cy.get("#password").type("wrong password");
//       cy.get("#login-form > .submit-btn").click();
//       cy.get(".fa-regular").click();
//   });

//   it("Login Successfully", () => {
//       cy.get("#username").clear().type("testUser123");
//       cy.get("#password").clear().type("password");
//       cy.get("#login-form > .submit-btn").click();
//   });

//   it("Open Leaderboards", () => {
//       cy.get("#Leaderboard-btn").click();
//       cy.get("#go-back-btn").click();
//   });

//   it("View a Habit", () => {
//       cy.get('[habit-id="635b84f8399f8f1d6ffe1804"]').click();
//   });

//   it("Increment Current on a habit", () => {
//       cy.get(".increment-habit-btn").click();
//       cy.wait(200);
//       cy.get(".back-btn").click();
//   });

//   it("Post new habit", () => {
//       cy.wait(200);
//       cy.get(".fa-solid").click();
//       cy.get("#habitName").type("Read");
//       cy.get("#habitTarget").type("2");
//       cy.get("#add-habit").click();
//   });

//   it("Open new habit", () => {
//       cy.wait(200);
//       cy.get(".habit-item").last().click();
//   });

//   it("Increment & remove", () => {
//       cy.wait(200);
//       cy.get(".increment-habit-btn").click();
//       cy.wait(200);
//       cy.get(".remove-habit-btn").click();
//   });

//   it("Logout", () => {
//       cy.wait(100);
//       cy.get("#logout-btn").click();
//   });
