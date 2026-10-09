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

4. Why throwing/handling errors matters on a server
Unhandled exceptions can crash the entire Node.js server process, causing downtime for all users.

Proper error handling (try/catch) allows the server to recover gracefully and return appropriate HTTP status codes (such as 400 or 500) to the client without exposing sensitive internal trace details.
