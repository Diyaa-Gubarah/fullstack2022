describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "https://blgbackend.herokuapp.com/api/testing/reset");
    const user = {
      name: "Diyaa Yasin",
      username: "Dgubarah",
      password: "Soper",
    };
    cy.request("POST", "https://blgbackend.herokuapp.com/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("user can login", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Login").click();
    cy.get("#username").type("Dgubarah");
    cy.get("#password").type("Soper");
    cy.get("#login-button").click();

    cy.get("html").contains("Dgubarah logged in");
  });

  it("login fails with wrong password", function () {
    cy.visit("http://localhost:3000");

    cy.contains("Login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "invalid username or password")
      .and("have.css", "color", "rgb(169, 68, 66)");

    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "Dgubarah", password: "Soper" }); // login using helper function from cypress/support/commands.js
    });

    it("a new blog can be created", function () {
      cy.createNoteApi({
        title: "New Blog",
        author: "New Author",
        url: "New Url",
      }); // create a new blog using helper function from cypress/support/commands.js
      cy.contains("New Blog"); // check if the text "New Blog" is in the page
    });

    it("a new blog can be liked", function () {
      cy.createNoteApi({
        title: "New Blog",
        author: "New Author",
        url: "New Url",
      }); // create a new blog using helper function from cypress/support/commands.js

      cy.contains("New Blog"); // check if the text "New Blog" is in the page

      cy.contains("view").click(); // click the button with the text "view"
      cy.get("#like-blog").click(); // click the button with the text "like"
    });

    it("a new blog can be removed", function () {
      cy.createNoteApi({
        title: "New Blog",
        author: "New Author",
        url: "New Url",
      }); // create a new blog using helper function from cypress/support/commands.js

      cy.contains("New Blog"); // check if the text "New Blog" is in the page
      cy.contains("view").click(); // click the button with the text "view"
      cy.get("#remove-blog").click(); // click the button with the text "remove"
      cy.get("html").should("not.contain", "New Blog"); // check if the text "New Blog" is not in the page
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.createNoteApi({
          title: "New Blog",
          author: "New Author",
          url: "New Url",
        }); // create a new blog using helper function from cypress/support/commands.js
        cy.createNoteApi({
          title: "New Blog 2",
          author: "New Author 2",
          url: "New Url 2",
        }); // create a new blog using helper function from cypress/support/commands.js
        cy.createNoteApi({
          title: "New Blog 3",
          author: "New Author 3",
          url: "New Url 3",
        }); // create a new blog using helper function from cypress/support/commands.js
      });

      it("like 2nd of blog and check if second blog become first blog", function () {
        cy.contains("New Blog 2").parent().contains("view").click();
        cy.contains("New Blog 2").parent().contains("like").click();
        cy.contains("likes 1");
        cy.contains("New Blog 2").parent().contains("hide").click();

        cy.get("#blogDiv").eq(0).should("contain", "New Blog 2");
        cy.get("#blogDiv").eq(1).should("contain", "New Blog");

        /**
         * we can use normal javascript to get the likes of the blog
         * we can use Promise and length as we manipulated the DOM
         * */
      });

      // it("then example", function () {
      //   cy.get("button").then((buttons) => {
      //     console.log("number of buttons", buttons.length);
      //     cy.wrap(buttons[0]).click();
      //   });
      // });
    });
  });
});
