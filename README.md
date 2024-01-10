# Data Network Overlock

This is [Data Network Overlock's](https://github.com/DataNetworkOverlock/DNOProject) API built with NodeJS and Typescript that connects to a MySQL database. It's made with hexagonal architecture patterns and the implementations of some of the SOLID principles.

## Pre-requisites

-   [NodeJS](https://nodejs.org/en/)
-   [MySQL Server 5.7.\*](https://dev.mysql.com/downloads/)

## Getting started

-   Clone the repository

```bash
git clone https://github.com/DataNetworkOverlock/dno-api.git
```

-   Install dependencies

```bash
cd dno-api
npm install
```

## Database

Data Network Overlock database has the following structure:

![Database relational model](./images/BBDD.png)

## Environment

-   These are the environmet variables used for connecting with the database

```
DB_HOST = localhost
DB_USER = <mysql-user>
DB_PASSWORd = <mysql-password>
DB_NAME = <database-name>
DB_PORT = <database-port>
PORT = 5000
SECRET = <secret key to generate JWT>
```

## Execution

-   Run

```bash
npm run dev
```

-   Test

> [!NOTE]
> Not yet implement

```bash
npm run test
```

## API Reference

| Method | URL              | Action                         | params                                          |
| ------ | ---------------- | ------------------------------ | ----------------------------------------------- |
| GET    | /users           | get all users                  | -                                               |
| POST   | /users           | create new user                | [New user](#new-user)                           |
| DELETE | /users/:uuid     | remove user by `uuid`          | -                                               |
| POST   | /script          | create nre script              | [New script](#new-script)                       |
| GET    | /tests           | get all tests                  | -                                               |
| GET    | /tests/:username | get tests by the selected user | [Get Tests by Username](#get-tests-by-username) |
| POST   | /tests           | create new test                | [New Test](#new-test)                           |
| DELETE | /tests/:uuid     | remove test by `uuid`          | -                                               |
| POST   | /login           | verify login info              | [Login](#login)                                 |

## Project Structure

| Name                  | Description                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| index.ts              | Entry point to Express app                                                                                                                   |
| src/domain            | Core of the application. Defines entities, types, interfaces, services and utils. Basically, the business rules.                             |
| src/domain/services   | Helper functions to retrieve data form databases                                                                                             |
| src/domain/utils      | Tools to assist some functionalities like generators                                                                                         |
| src/domain/exceptions | Error handling with custom exceptions                                                                                                        |
| src/application       | It's where business process flows are handled. It defines Use Cases for the app                                                              |
| src/infrastructure    | Layer that access external services like databases. It uses driven and driving adapters to interact between the user and the infrastructure. |
| package.json          | Contains npm dependencies and scripts                                                                                                        |

## JSON

### New User

Payload:

```json
{
    "name": "John Doe",
    "username": "John123",
    "password": "Password",
    "question": "¿Nombre de mascota?",
    "answer": "Daniel"
}
```

Output:

```json
{
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    },
    "metadata": {
        "uuid": "930e0cb2-3fdb-4f7e-9bdc-fd857991fd4d",
        "name": "John Doe",
        "username": "John123",
        "password": "Password",
        "question": "¿Nombre de mascota?",
        "answer": "Daniel"
    }
}
```

### New Script

Payload:

```json
{
    "name": "Nmap scan",
    "description": "Nmap script that checks on ports",
    "source": "/home/user/scripts/nmap",
    "tags": ["Nmap", "Red"]
}
```

Output:

```json
{
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    },
    "metadata": {
        "uuid": "47a162e4-ae7f-4ea6-9c47-c2ec78c564cc",
        "name": "Nmap scan",
        "description": "Nmap script that checks on ports",
        "source": "/home/user/scripts/nmap",
        "tags": ["Nmap", "Red"]
    }
}
```

### Get tests by Username

Output:

```json
{
    "uuid": "930e0cb2-3fdb-4f7e-9bdc-fd857991fd4d",
    "name": "John Doe",
    "username": "John123",
    "tests": [
        {
            "uuid": "167bba7f-93eb-4f34-ab27-3f63f5282dda",
            "ip": "192.168.0.100",
            "date": "Sun Dec 10 2023 01:13:15 GMT-0500 (hora estándar de Colombia)",
            "report": "...",
            "script": "Nmap scan"
        },
        {
            "uuid": "5934f374-b4e3-4ccc-aa26-22c79a47977e",
            "ip": "192.168.0.100",
            "date": "Sun Dec 10 2023 01:13:15 GMT-0500 (hora estándar de Colombia)",
            "report": "...",
            "script": "Nmap scan"
        }
    ]
}
```

### New Test

Payload:

```json
{
    "ip": "192.168.0.100",
    "date": "2023-12-09 10:13:15",
    "report": "report",
    "user": "930e0cb2-3fdb-4f7e-9bdc-fd857991fd4d",
    "script": "47a162e4-ae7f-4ea6-9c47-c2ec78c564cc"
}
```

Output:

```json
{
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    },
    "metadata": {
        "uuid": "d9a2d26f-123a-490e-b178-70ace174ae18",
        "ip": "192.168.0.100",
        "date": "2023-12-09 10:13:15",
        "report": "report",
        "user": "930e0cb2-3fdb-4f7e-9bdc-fd857991fd4d",
        "script": "47a162e4-ae7f-4ea6-9c47-c2ec78c564cc"
    }
}
```

### Login

Payload:

```json
{
    "username": "John123",
    "password": "Password"
}
```

Output:

```json
{
    "uuid": "930e0cb2-3fdb-4f7e-9bdc-fd857991fd4d",
    "name": "John Doe",
    "username": "John123",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoieCIsImlhdCI6MTcwNDkyNTU5MiwiZXhwIjoxNzA0OTI3MzkyfQ.r5lPmKHLiKbVT1pDI1G83zWtJ-KuR2-yrQyESXgCHko"
}
```
