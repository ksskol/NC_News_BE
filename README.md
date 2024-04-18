## NC_News
This project involves building an API to access application data programmatically, mimicking the functionality of real-world backend services like Reddit. The API interacts with a PostgreSQL database using node-postgres. With this setup, users can seamlessly access and manipulate data from the application's backend.

### This is the *[link](https://nc-news-ufj8.onrender.com)* to my project.
Take a look at the `/api` directory for a detailed list of every endpoint.

### Minimum versions:
[Node.js](https://nodejs.org/en/) v21.6.2

[Postgres](https://www.postgresql.org/download/) v14.11

---

### To run this project on your computer, you'll need to do a few things: 
>
1.**Clone the Repository:** Clone the repository to your local machine using Git. Open your terminal and run:

`git clone <repository_url>`

Replace <repository_url> with the URL of the repository you want to clone.
>
2.**Set Up Environment Variables:** In the root of the folder, create two 

`.env files` `.env.test` and `.env.development`.

For .env.test, add the following:

`PGDATABASE=nc_news_test`

For .env.development, add the following:

`PGDATABASE=nc_news`
>
3.**Install Dependencies:** Navigate to the root of the cloned repository in your terminal and run:

`npm install`

This will install all the necessary dependencies specified in package.json.
>
4.**Set Up Databases:** Run the following command to set up local databases:

`npm run setup-dbs`
>
5.**Seed Local Database:** After setting up the databases, seed the local database by running:

`npm run seed`
>
6.**Run Tests:** Finally, execute the following command to run the test script:

`npm run test`

This will execute the test suite and provide you with the test results.

---
### Following these steps should allow you to clone the repository, install dependencies, seed the local database, and run tests successfully. 

**Dev dependencies:**
jest,
jest-extended,
jest-sorted,
supertest,
husky

**Dependencies:**
dotenv,
pg,
express,
pg-format