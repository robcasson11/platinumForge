# platinumForge

This is an in depth to-do list for a small business that repairs “items”. The "tasks" (or in this case "items") are displayed via feeds. The feeds determine which "items" to display based on either, what it needs, when it needs to be completed, whether it is completed or if it has been collected.

//link to brief
//screenshots of working app

# The Stack

MongoDB, Express, React and Node are the fundamental languages and frameworks used.

# Other packages and dependencies used within the app...

MongoDB:

- Mongoose

- mongoose-sequence - to "auto increment" aspects of the mongoose schema

Express and Node:

- cors - To help determine the origin of the requests to the server

- express-async-handler

- bcrypt

- date-fns, uuid, fs(node) and path(node)- Combined to build a custom logger to act as middleware for the likes of error handling

- express Router - Creates custom routes for the CRUD operations of the API

React:

- Axios - To handle the requests to the API

- react icons

- react-router-dom -

  - Including "useLocation" and "switch" for navigating
  - Outlet - Used alongside nested Routes to influence UI
  - useParams

- Hooks -

  - useContext - To help manage the flow of the code and state
  - useState
  - useEffect
  - useRef - To control the state of elements in a form (So a checkbox resets to un-checked if a user returns to add a second item)

- Custom Hook UseWindowSize - To use screen dimensions in ternary statements that control the style attribute of elements
