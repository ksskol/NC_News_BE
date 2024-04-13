To run this project on your computer, you'll need to do a few things:

1. Make two files named .env.test and .env.development.

2. Inside each of these files, write PGDATABASE= followed by the correct database name from the /db/setup.sql file. Replace your_database_name with the name of the database.

.env-example:
PGDATABASE=database_name_here

3. Make sure to keep both .env.test and .env.development files private by adding them to the .gitignore file.