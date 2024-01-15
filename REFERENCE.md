# Content

-   [POST](#post)
    -   [Login](#login)
    -   [New user](#new-user)
    -   [New script](#new-script)
    -   [New test](#new-test)
-   [GET](#get)
    -   [Get users](#get-users)
    -   [Get scripts](#get-scripts)
    -   [Get tests](#get-tests)
    -   [Get tests by username](#get-tests-by-username)

## POST

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
    "parameters": "param1,param2,param3",
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
        "parameters": "param1,param2,param3",
        "tags": ["Nmap", "Red"]
    }
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

## GET

### Get users

Output:

```json
[
    {
        "uuid": "930e0cb2-3fdb-4f7e-9bdc-fd857991fd4d",
        "name": "John Doe",
        "username": "John123",
        "password": "Password",
        "question": "¿Nombre de mascota?",
        "answer": "Daniel"
    }
]
```

### Get scripts

Output:

```json
[
    {
        "uuid": "47a162e4-ae7f-4ea6-9c47-c2ec78c564cc",
        "name": "Nmap scan",
        "description": "Nmap script that checks on ports",
        "source": "/home/user/scripts/nmap",
        "parameters": ["param1", "param2"],
        "tags": ["Nmap", "Red"]
    }
]
```

### Get tests

Output:

```json
[
    {
        "uuid": "d9a2d26f-123a-490e-b178-70ace174ae18",
        "ip": "192.168.0.100",
        "date": "2023-12-09 10:13:15",
        "report": "report",
        "user": "930e0cb2-3fdb-4f7e-9bdc-fd857991fd4d",
        "script": "47a162e4-ae7f-4ea6-9c47-c2ec78c564cc"
    }
]
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
