describe("multiplayer function", () => {
	beforeEach(() => {
		cy.viewport(1600, 900);
	});

	it("opens homepage successfully", () => {
		cy.visit("https://mandemzmadquiz.netlify.app/");
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
	it("starts the quiz", () => {
		cy.get(".btns > :nth-child(1)").click();
	});

	it("completes the quiz", () => {
		cy.wait(4000);
		cy.get(":nth-child(1) > :nth-child(1) > .ui").click();
		cy.wait(1100);
		cy.get(":nth-child(2) > :nth-child(1) > .ui").click();
		cy.wait(1100);
		cy.get(":nth-child(1) > :nth-child(2) > .ui").click();
		cy.wait(1100);
		cy.get(":nth-child(2) > :nth-child(2) > .ui").click();
		cy.wait(1100);
		cy.get(":nth-child(1) > :nth-child(1) > .ui").click();
		cy.wait(1100);
		cy.get(":nth-child(2) > :nth-child(1) > .ui").click();
		cy.wait(1100);
		cy.get(":nth-child(1) > :nth-child(2) > .ui").click();
		cy.wait(1100);
		cy.get(":nth-child(2) > :nth-child(2) > .ui").click();
		cy.wait(1100);
		cy.get(":nth-child(1) > :nth-child(2) > .ui").click();
	});
	it("goes to the results page", () => {
		cy.wait(1100);
		cy.get(":nth-child(2) > :nth-child(2) > .ui").click();
	});
	it("goes back to home", () => {
		cy.wait(100);
		cy.get(".home-btn").click();
	});
});

describe("user accesses leaderboard", () => {
	beforeEach(() => {
		cy.viewport(1600, 900);
	});
	it("successfully opens leaderboard", () => {
		cy.get('[href="/leaderboard"] > .ui').click();
		cy.get(".leaderboard");
	});
});

describe("NotFound page appears for wrong url", () => {
	beforeEach(() => {
		cy.viewport(1600, 900);
	});
	it("opens NotFound page with wrong url", () => {
		cy.visit("https://mandemzmadquiz.netlify.app/sadfasdf");
	});
});
