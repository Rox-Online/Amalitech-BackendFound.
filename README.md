# Amalitech-BackendFound.
Amalitech AVI internship project works 

What i have Understood
1. Difference between synchronous and asynchronous execution
Synchronous: Code executes line by line in sequence. Each operation must finish before the next one starts, blocking further execution until completed.

Asynchronous: Operations (such as database queries or network requests) run in the background, allowing other code to execute without waiting for the task to finish.

2. What await does and why it is used inside an async function
await pauses the execution of an async function until a Promise resolves or rejects.

It allows asynchronous code to be written and read like synchronous code, making error handling and flow control cleaner without blocking the main event loop.

3. Difference between map and filter
map: Transforms every element in an array according to a callback function and returns a new array of the exact same length.

filter: Tests each element against a condition and returns a new array containing only the elements that pass the condition.

Day 2 - TypeScript Notes

5. Type-Safety Challenge
- Experiment: Attempted to pass an invalid status string to `updateTaskStatus(1, 'INVALID_STATUS')`.
- Compiler Error:
  `Type '"INVALID_STATUS"' is not assignable to type 'TaskStatus'.`
- Explanation: TypeScript caught the invalid value at compile time before the code could run. This prevents invalid state changes from reaching production or breaking runtime logic.

6. Prove You Understand
TypeScript vs JavaScript: JavaScript executes dynamically at runtime without static type checking. TypeScript adds a static type layer on top of JavaScript to catch type mismatches, missing properties, and invalid arguments during development.
Compile Time vs Runtime: Compile time is when TypeScript checks the codebase and transpiles `.ts` files into `.js` files (`tsc`). Runtime is when Node.js actually executes the resulting JavaScript code.
Interface / Type in Task Object: The `Task` interface defines the mandatory shape and types of a task entity (e.g., `id: number`, `status: TaskStatus`), ensuring every task object strictly follows this contract across the application.
Excessive `any`: Using `any` explicitly disables TypeScript’s type checking for that variable, removing compile-time error detection and defeating the purpose of using TypeScript.
`npm run build`: Executes the TypeScript compiler (`tsc`), which type-checks the application and compiles source files from `src/` into runnable JavaScript in the `dist/` directory.

4. Why throwing/handling errors matters on a server
Unhandled exceptions can crash the entire Node.js server process, causing downtime for all users.

Proper error handling (try/catch) allows the server to recover gracefully and return appropriate HTTP status codes (such as 400 or 500) to the client without exposing sensitive internal trace details.

Day3:
1. Tracing `POST /tasks`:
* Incoming client HTTP request hits the Node.js HTTP server.


  `express.json()` parses the raw JSON body into `req.body`.


 `requestLogger` middleware logs the timestamp, method, and route.


 Express routes match `POST /tasks` to `taskController.createTask`.


Controller validates request body; if valid, delegates task creation logic to `taskService`.


Service creates the task entity and returns it to the controller.


Controller returns a `201 Created` HTTP response with JSON payload to the client.

2. Route vs. Controller vs. Service:
* Route: Maps HTTP methods and URL paths to specific handlers.


* Controller: Handles HTTP requests/responses, status codes, and input validation.


* Service: Encapsulates core business logic and state operations independently of HTTP.

3. Middleware & Request Logger:
Middleware functions execute sequentially during the request-response lifecycle before reaching final route handlers.


* The request logger runs globally (`app.use(requestLogger)`) before any route is matched.

4. Parameters & Body:
* Path Parameters (`req.params`): Part of the URL route pattern identifying specific resources (e.g., `/tasks/:id`).


* Query Parameters (`req.query`): Key-value options following `?` in the URL used for filtering/sorting (e.g., `/tasks?status=TODO`).


* Request Body (`req.body`): Main payload sent in POST/PATCH/PUT requests holding detailed object data.

5. 200 vs 201 Status Codes:
* `200 OK`: Standard response indicating an HTTP operation succeeded.


* `201 Created`: Explicitly signals that a new resource was successfully created on the server.

6. Monolithic `server.ts` Issue:
* Placing all routes, handlers, middleware, and business logic into a single file causes codebase bloat, tight coupling, poor readability, and hard unit testing as application scale increases.
