# Feedback Notes

## Hiring

Visit bard.google.com and use the following prompt to see what someone hiring might check for if they're independently reviewing your code

> I am a lead developer and hiring for a new position for our team. A candidate has provided a demo React Native repository. What can I look out for which demonstrates proficiency with the language and thought regarding the application?

## General notes

- Add a 'Readme.md' (in the top level directory) and should include a description (no more than 50 words) of the application, and a link to 'brief.md' in the same directory. Include screenshots for anyone looking at the repository who doesn't have access to the build. Should also include instructions on how to build and deploy.
- In future, commits should be **small, frequent, and focussed**
  - "add user model, routes, and controller with tests to backend"
  - "add user frontend"

## Backend

- 'backend/controllers/jobsControllers.js' line 84 there's code commented out for deployment - look at **environment variables** (https://blog.logrocket.com/understanding-react-native-env-variables/)
- **thin** controllers, **fat** models; there are bits of code for finding (e.e.g duplicates), creating (e.g. setting the 'jobNum' and various other variables) - you want this in the **model**. E.g., you could have a **Job.createFromRequest(...)** method which accepts the body of a request, "transforms" the object ready for persiting to the database (setting the jubNum etc etc) - The controller should be responsible looking at the body of the request and **validating it**, then passing to the model for storing the data - by having any transformation of the object before it hits the database in the model means it's reuseable in other components when the application gets bigger
