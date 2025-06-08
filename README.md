# Using Playwright with Typescript to automate test in SauceDemo

<p>I do not own SauceDemo. Website is owned by Sauce Labs. I am only using the website to practice and apply my knowledge on automation tools/frameworks.</p>

### Login Tests

| Test ID     | Description                                                         |
| :---        | :---                                                                |
| 1           | should be able to login when inputting valid credentials            |
| 2           | should not be able to login when inputting invalid credentials      |
| 3           | should not be able to login when not inputting username or password |
| 4           | should not be able to login when username is not entered            |
| 5           | should not be able to login when password is not entered            |


### Checkout Tests

| Test ID     | Description                                                                             |
| :---        | :---                                                                                    |
| 1           | should be able to checkout multiple items                                               |
| 2           | should be able to remove items in shopping cart and then checkout the remaining items   |
| 3           | should be able to checkout item if added from item page                                 |
| 4           | should not be able to checkout if checkout information is not given                     |


### Run the Playwright test in Docker
---
```bash
docker build -t {name_of_your_playwright_test_image} .
docker run -it {name_of_your_playwright_test_image} npm run test
```
---
