# Backend API Documentation
### Base URL
```
http://127.0.0.1:8000/api/v1/tasks
```
### Endpoints
## Complete All Tasks
Marks all tasks as completed.
### URL
```
PUT /all
```
### Request
No request parameters are required for this endpoint.
### Response
* **200 OK** - If the request is successful.
* **400 Bad Request** - Database related errors.
* **500 Internal Server Error** - For other errors.

## Complete a Specific Task
Marks a specific task as completed.
### URL
```
PUT /complete/:id
```
### Request
#### Parameters
* **id** - Replace ':id' with the task id.
### Response
* **200 OK** - If the request is successful.
* **400 Bad Request** - Database related errors.
* **500 Internal Server Error** - For other errors.

## Create New Task
Create a new task.
### URL
```
POST /new
```
### Request
#### Body Parameters
* **text** - Task text.
### Response
* **200 OK** - If the request is successful.
* **400 Bad Request** - The text is empty.
* **500 Internal Server Error** - For other errors.

## Delete All Tasks
Deletes all completed or uncompleted tasks.
### URL
```
DELETE /all
```
### Request
#### Query Parameters
* **uncompleted**
  - true - To delete all uncompleted tasks.
  - false - To delete all completed tasks.
### Response
* **200 OK** - If the request is successful.
* **400 Bad Request**
  1. Parameter 'uncompleted' is not specified.
  2. Parameter 'uncompleted' is neither "true" nor "false".
* **500 Internal Server Error** - For other errors.

## Delete a Specific Task
Deletes a specific task.
### URL
```
DELETE /
```
### Request
#### Query Parameters
* **id** - Task id.
### Response
* **200 OK** - If the request is successful.
* **400 Bad Request** - If the task id is not specified.
* **500 Internal Server Error** - For other errors.

## Get All Completed Tasks
Retrieves a list of all completed tasks.
### URL
```
GET /completed
```
### Request
No request parameters are required for this endpoint.
### Response
* **200 OK** - If the request is successful.
* **404 Not Found** - If there are no completed tasks.
* **500 Internal Server Error** - For other errors.

## Get All Uncompleted Tasks
Retrieves a list of all uncompleted tasks.
### URL
```
GET /
```
### Request
No request parameters are required for this endpoint.
### Response
* **200 OK** - If the request is successful.
* **404 Not Found** - If there are no uncompleted tasks.
* **500 Internal Server Error** - For other errors.

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
* **200 OK** - If the request is successful.
* **400 Bad Request**
  1. The task id is not specified.
  2. The text is empty.
  3. Database related errors.
* **500 Internal Server Error** - For other errors.
