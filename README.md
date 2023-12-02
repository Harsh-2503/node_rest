# NodeJS Coding Challenge

# Description

Rest App is a Node.js project designed to provide a scalable and efficient RESTful API using the Express framework. It incorporates TypeScript for enhanced code maintainability and readability. This project is suitable for building robust and well-structured backend services for web applications.

# Features

Express Framework: Utilizes the popular Express framework for building web applications and APIs.
TypeScript Support: Enhances code quality and developer experience with the use of TypeScript, providing static typing and improved tooling.
Dependency Management: Manages project dependencies effectively with npm, including essential packages such as express, dotenv for environment variables, cors for Cross-Origin Resource Sharing, and pg for PostgreSQL database interaction.
Validation with express-validator: Implements request validation using the express-validator library to ensure data integrity and security.
Automatic Restart with Nodemon: Facilitates the development process by automatically restarting the server during code changes using nodemon.
Database Integration: Utilizes the pg package for seamless integration with PostgreSQL databases.
Build Script: Includes a build script that uses TypeScript Compiler (tsc) for compiling TypeScript code into JavaScript for production use.

# Usage

# Installation

Clone the repository from Bitbucket:
ssh: git clone git@bitbucket.org:pen-stack/node_rest.git
https: git clone https://theMusubi@bitbucket.org/pen-stack/node_rest.git

My Node Version: v18.18.2

Navigate to the project directory: cd node_rest
Install dependencies: npm install
For development: npm run dev
For production: npm run build && npm run start

Configuration
The project uses dotenv for environment variables. Create a .env file in the project root and configure your environment variables as needed a demo.env is provided for reference.

# Curl Commads for Testing

I have provided a google drive link for postman json files as well which can imported
Link: https://drive.google.com/drive/folders/1uGci1jIZa_0uRS0wbg2zh3s-zG1X8cyM?usp=sharing

Manufacturer CRUD:

create
curl --location 'http://54.234.57.29/manufacturer' \
--header 'Content-Type: application/json' \
--data '{
"name":"Tata"
}'

read

-all manufacturer
curl --location 'http://54.234.57.29/manufacturer?page=1'

-specific manufacturer
curl --location 'http://54.234.57.29/manufacturer/e56cecef-9aa1-42df-ae67-9192ccc6993c'

-manufacturer equipments
curl --location --request GET 'http://54.234.57.29/manufacturer/equipment?page=1' \
--header 'Content-Type: application/json' \
--data '{
"id":"e56cecef-9aa1-42df-ae67-9192ccc6993c"
}'

update
curl --location --request PUT 'http://54.234.57.29/manufacturer' \
--header 'Content-Type: application/json' \
--data '{
"name":"Meta",
"id": "e56cecef-9aa1-42df-ae67-9192ccc6993c"
}'

delete
curl --location --request DELETE 'http://54.234.57.29/manufacturer/142a65d2-cbe8-42e2-9801-1b840df7cffc' \
--header 'Content-Type: application/json' \
--data '{
"id":"e56cecef-9aa1-42df-ae67-9192ccc6993c"
}'

Equipment CRUD:

create
curl --location 'http://54.234.57.29/equipment' \
--header 'Content-Type: application/json' \
--data '{
"model":"Suv3",
"manufacturer_id":"e56cecef-9aa1-42df-ae67-9192ccc6993c",
"serialnumber": "A00011"
}'

read
-all equipments
curl --location 'http://54.234.57.29/equipment?page=1'

-specific manufacturer
curl --location 'http://54.234.57.29/equipment/9700c8e2-6d8a-43e9-a5e2-bb954513bd7a'

-equipment manufacturer
curl --location --request GET 'http://54.234.57.29/equipment/manufacturer' \
--header 'Content-Type: application/json' \
--data '{
"id":"9700c8e2-6d8a-43e9-a5e2-bb954513bd7a"
}'

update
curl --location 'http://54.234.57.29/equipment' \
--header 'Content-Type: application/json' \
--data '{
"model":"Suv3",
"manufacturer_id":"e56cecef-9aa1-42df-ae67-9192ccc6993c",
"serialnumber": "A00011"
}'

delete
curl --location --request DELETE 'http://54.234.57.29/equipment/b3fb3f9d-8446-4063-91a2-9d06516d0933'

# server ssh

Since I don't have you public ssh keys to add to the server
I am attaching a drive link for the pem file to access the ec2 server and inviting Mr victor@beamdynamics.io as well as backenddeveloper@beamdynamics.io

Link: https://drive.google.com/drive/folders/1SYfwJ2s2R7SFjvU0z62Wpozkzvg5SqlW?usp=drive_link

Navigate to the directory where node_rest.pem file is present

ssh: ssh -i node_rest.pem ubuntu@ec2-54-234-57-29.compute-1.amazonaws.com

# pm2

to see last 100 pm2 out logs
tail -f -n 100 ~/.pm2/logs/node-rest-out.log

to see last 100 pm2 error logs
tail -f -n 100 ~/.pm2/logs/node-rest-error.log

start pm2
cd /home/ubuntu
pm2 start node_rest/dist/index.js --name node_rest

stop pm2
pm2 stop node_rest

restart pm2
pm2 restart node_rest

# postgres database

The database is downloaded on the ec2 instance

commands to use database
sudo -u postgres psql
\c node_rest

to see tables
\dt

Databse Creadentials

PORT = 4999
DB_USER = postgres
DB_NAME = node_rest
DB_PASSWORD = 8961Test
DB_PORT = 5432
DB_HOST = localhost
