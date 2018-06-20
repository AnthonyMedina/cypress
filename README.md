# To begin

- Snippets (ES6 Mocha Snippets, Reactjs code snippets)
- Babel
- Look at [prop-types](https://reactjs.org/docs/typechecking-with-proptypes.html).
- Explore app & show prop-types

## Testing React

### Different Tools for Testing

- All sold on TDD?
- Selenium in combo with other stuff (perhaps Nightwatch)
- Enzme (AirBnb) & Jest (FB)
- react-testing-library (Kent C. Dodds)
- [Cypress](https://www.cypress.io/)

---

### Why Cypress?

- Good docs
- Snapshot ability
- Can watch automated testing run
- Runs mocha & chai under the hood, so syntax very familiar

---

### Install Cypress

- `npm i -D cypress`
- add script to package.json: `"cypress:open": "cypress open"`
- `npm run cypress:open`
- look at changes to repo:
  - cypress.json (more on that later)
  - integration for tests
  - fixtures for useful data imports
  - support/commands for creating your own custom cypress commands
- watch default tests run in chrome
- show some features in example tests
- delete example tests

### Make first tests

- first test

```
describe("Our first test", () => {
  it("doesn't do much", () => {
    expect(true).to.equal(true);
  })
})
```

- show test failing
- real test
- start up app `npm start`, then create file ./cypress/integration/task-adder.spec.js
- make first proper test:

```
describe("TaskAdder", () => {
  it("input exists", () => {
    cy.visit("http://localhost:3000");

    cy.get(".new-task")
  })
})
```

- that's a bad test, let's say we want to be able to type in the input straight away:

```
describe("TaskAdder", () => {
  it("is focused on load", () => {
    cy.visit("http://localhost:3000");

    cy.focused().should("have.class", "new-task")
  })
})
```

- now, let's make it pass (add `autoFocus` to input)

```
it("accepts input", () => {
  cy.visit("http://localhost:3000")
})
```

- already repeating ourselves. 2 things we can do:

1.  add `"baseUrl: "http://localhost:3000"` to cypress.json
1.  add `cy.visit("")` in a beforeEach block

```
it.only("accepts input", () => {
  cy.get(".new-task")
    .type("Get a kitten")
    .should("have.value", "Get a kitten")
})
```

- refactor so that `const typedInput = "Get a kitten";`.
- Now, we need to make it a controlled input.

```
context("Form submission", () => {
   it("adds a new task on submit", () => {
     cy.get(".new-task")
      .type("Buy a liger")
      .type("{enter}");
   });
})
```

- look at why test now fails (obviously because we haven't built that behaviour in yet) but there are submit, page load and new url events happening too.

- our app will use an api, but it hasn't been built yet. Cypress allows us to "stub" an api call.

```
context("form submission", () => {
    it.only("adds a new task on submit", () => {
      const typedInput = "Buy a liger";
      cy.server();
      cy.route("POST", "/api/tasks", {
        id: Date.now(),
        text: typedInput,
        isComplete: false
      });

      cy.get(".new-task")
        .type(typedInput)
        .type("{enter}")
        .should("have.value", typedInput);

      cy.get("li")
        .should("have.length", 2)
        .and("contain", typedInput);
    });
  });
```

- Make a new file in integration: app-init.spec.js
- We want app to load our tasks from an api when it has loaded

```
const tasks = [
  {
    id: 1,
    text: "Use functional components if possible",
    isComplete: true
  },
  {
    id: 2,
    text: "Use prop-types",
    isComplete: true
  },
  {
    id: 3,
    text: "Explore Cypress",
    isComplete: false
  },
  {
    id: 4,
    text: "Make amazing React apps",
    isComplete: false
  }
];

describe("App initialisation", () => {
  it.only("Loads todos on page load", () => {
    cy.server();
    cy.route("GET", "/api/tasks", tasks);
    cy.visit("/");

    cy.get("li").should("have.length", 4);
  });
});
```

- That data might be useful later, so we can put store it in "./cypress/fixtures/tasks.json"
- Then, replace any references to `tasks` with a string: "fixture:tasks"

- The first part of this test (populating our app) seems like something that we would want to repeat, so we can make a custom cypress command.
  - Go to "./cypress/support/commands.js" and add:

```
Cypress.Commands.add("seedAndVisit", () => {
  cy.server();
  cy.route("GET", "/api/tasks", "fixture:tasks");
  cy.visit("/");
});
```

- Now, change above test to:

```
describe("App initialisation", () => {
  it.only("Loads todos on page load", () => {
    cy.seedAndVisit();

    cy.get("li").should("have.length", 4);
  });
});
```

** ADD TESTS FOR VISIT FAILING API CALLS **

```
it.only("displays an error message on failure", () => {
  cy.server()
  cy.route({
    url: "/api/tasks",
    method: "GET",
    response: {}
  })
  cy.visit("/");

  cy.get("li")
    .should("not.exist")

  cy.get(".error")
    .should("be.visible")
})
```

** Add optional option to seed data **

```
Cypress.Commands.add("seedAndVisit", (seedData = "fixture:tasks") => {
  cy.server();
  cy.route("GET", "/api/tasks", seedData);
  cy.visit("/");
});
```

- Add seedAndVisit to all beforeEach hooks, passing in [] if want no list items to be shown
