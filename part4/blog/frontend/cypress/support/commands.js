// because we need login user for other tests, we need to export it to other files
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://blgbackend.herokuapp.com/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("user", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

// create a new blog
Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.contains("Create Blog").click(); // click the button with the text "Create Blog"
  cy.get("#title").type(title); // type "New Blog" into the input with the id "title"
  cy.get("#author").type(author); // type "New Author" into the input with the id "author"
  cy.get("#url").type(url); // type "New Url" into the input with the id "url"
  cy.get("#create").click(); // click the button with the id "create"
});

// create a new blog using api
Cypress.Commands.add("createNoteApi", ({ author, title, url }) => {
  cy.request({
    url: "http://blgbackend.herokuapp.com/api/blogs",
    method: "POST",
    body: { author, title, url },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });

  cy.visit("http://localhost:3000");
});
