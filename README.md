
# To-Do List App Backend

The backend of the To-Do List App is built with Express and TypeScript, running on Firebase Cloud Functions to provide a scalable and efficient API. It handles user authentication, task management. The architecture was designed with modularity and maintainability in mind, ensuring a seamless integration with the frontend.

## API Endpoints

#### Create User

```http
  POST /api/user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email to create user |

#### Read User

```http
  GET /api/user?email=some@email.com
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `query` | **Required**. Email to get user info |


#### Create Task

```http
  POST /api/items
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Task title |
| `description`      | `string` | **Required**. Task description |
| `completed`      | `boolean` | **Required**. False by default |

#### Read Tasks

```http
  GET /api/items/?email=some@email.com
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `query` | **Required**. Email to get user's tasks |


#### Update Task

```http
  PATCH /api/items?taskId=some@email.com
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `taskId`      | `query` | **Required**. Task Id to update |
| `title`      | `string` | **Required**. Task title |
| `description`      | `string` | **Required**. Task description |
| `completed`      | `boolean` | **Required**. False by default |

Update ay field of the task.

#### Delete Task

```http
  DELETE /api/items?taskId=some@email.com
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `taskId`      | `query` | **Required**. Task Id to delete |


## Tech Stack

**Server:** Express 4.21.2, Typescript, Firebase Cloud Functions, Firestore.



## Run Locally

Clone the project

```bash
  git clone https://github.com/juanjo097/todo-list-backend
```

Go to the project directory

```bash
  cd todo-list-backend
```

Install dependencies

```bash
  npm install
```

Build the code

```bash
  npx tsc 
```

Start the server

```bash
  firebase emulators:start
```

