# platinumForge

This is an in depth to-do list for a small business that repairs “items”. The "tasks" (or in this case "items") are displayed via feeds. The feeds determine which "items" to display based on either, what it needs, when it needs to be completed, whether it is completed or if it has been collected.

[](Brief.txt)

# Installing and Running

Node v18 required to run.

Clone the Repository

cd platinumForge

cd backend

npm install

touch .env

copy the .env.example file text and paste into the created .env file you just created

Replace the DATABASE_URI with your own mongoDB URI

cd ..

cd frontend

npm install

From this directory (platinumForge/frontend) run…

npm start

In a separate terminal from the backend directory (platinumForge/backend) run…

npm run dev

Note: allowedOrigins.js in the config file in the backend diretory is set to localhost only. If needed you may need to add your own origin here.

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

# Screenshots

<img src="Screenshots/1welcomeScreenShot.jpg" width=50%>
<img src="Screenshots/2Form.jpg" width=50%>
<img src="Screenshots/3Dashboard.jpg" width=50%>
<img src="Screenshots/4JobPage.jpg" width=50%>
<img src="Screenshots/5QuotesPage.jpg" width=50%>
<img src="Screenshots/6CollectionsFeed.jpg" width=50%>
