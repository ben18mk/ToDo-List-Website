# To-Do List - Website
* [Backend Setup](#backend-setup)<br>
* [Website Preview](#website-preview)
* [Backend API Documentation](#backend-api-documentation)

# Backend setup
### Package Installation
1. Open a terminal.
2. Navigate to the backend root directory.
3. Type the following in the terminal:
```
npm install cors dotenv express mongodb
```
4. Type the following in the terminal:
```
npm init -y
```
5. A file named "package.json" has been added, open it.
6.  Add the following:
```
"type": "module"
```
7. Save the file.

### Environment Variables
1. Create a file named '.env' in the backend root directory.
2. Open it.
3. Add the following:
```
MONGO_USERNAME=
MONGO_PASSWORD=
```
4. Enter your MongoDB credentials in the above variables.
5. Save the file.

# Website Preview
### index.html
![index.html](https://github.com/ben18mk/ToDo-List-Website/assets/56043333/adf73f09-197a-4ff9-bba4-e64305b2a0b1)
### completed.html
![completed.html](https://github.com/ben18mk/ToDo-List-Website/assets/56043333/878d2f79-cef3-4475-8731-317118501fbb)

# Backend API Documentation
### Base URL
```
http://127.0.0.1:8000/api/v1/tasks
```
### Endpoints
## Get All Tasks
Retrieves a list of all uncompleted tasks.
### URL
```
GET /
```
### Request
No request parameters are required for this endpoint.
### Response
* **200 OK** - if the request is successful.
* **404 Not Found** - if there are no uncompleted tasks.
* **500 Internal Server Error** - for other errors.

## Delete Task
Deletes a specific task.
### URL
```
DELETE /
```
### Request
#### Query Parameters
* **id** - Task id.
### Response
* **200 OK** - if the request is successful.
* **400 Bad Request** - if the task id is not specified.
* **500 Internal Server Error** - for other errors.

## Update Task
Updates a specific task.
### URL
```
PUT /
```
### Request
#### Query Parameters
* **id** - Task id.
#### Body Parameters
* **text** - Updated text.
### Response
* **200 OK** - if the request is successful.
* **400 Bad Request**
  1. The task id is not specified.
  2. The text is empty.
  3. Database related errors.
* **500 Internal Server Error** - for other errors.

## Complete All Tasks
Marks all tasks as completed.
### URL
```
PUT /all
```
### Request
No request parameters are required for this endpoint.
### Response
* **200 OK** - if the request is successful.
* **400 Bad Request** - database related errors.
* **500 Internal Server Error** - for other errors.

## Delete All Tasks
Deletes all completed or uncompleted tasks.
### URL
```
DELETE /all
```
### Request
#### Query Parameters
* **uncompleted**
  - true - to delete all uncompleted tasks.
  - false - to delete all completed tasks.
### Response
* **200 OK** - if the request is successful.
* **400 Bad Request**
  1. Parameter 'uncompleted' is not specified.
  2. Parameter 'uncompleted' is neither "true" nor "false"
* **500 Internal Server Error** - for other errors.
