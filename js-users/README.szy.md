# Users at http://js-assessment-backend.herokuapp.com/users

## Starting from a clone of an another project

To save time, I copied an another project (it is from Brad Traversy, from an Udemy course).
I spent some time without commiting, so far I:

- spent some time testing the Api with Postman
- spent some time checking different pagers/tables/grids, which one to use.
- created a new page: /users
- created the user reducer (the base project is using redux, I just leave it as it is.)
- because of CORS, created a server-side api route, to use it as a proxy.
- /users now can get userlist thru axios->backend->heroku and present all users on one page.
- copied the current code here, git init.

## todos, questions

- pages
  -- main page
  -- users page
  --- can open a user -> show info (maybe modal?), Link: edit page
  --- can search/filter
  -- add new user
  -- one user edit page
- Header: NavLinks: Home, Users, AddNew, Edit

- Modules:
  -- Router
  -- axios to handle communication
  -- "loading": modal?
  -- choose module for pagination
  --- can handle "open user"
  --- can handle "activate/lock" (an extra column? mobile-style?)
  --- can display strikethrough for lockeds
  --- 10 users per page
  --- chk: https://github.com/carlosrocha/react-data-components
  --- chk: https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/getting-started/
  --- chk: http://tabulator.info/

- design: how fancy?
  -- css, scss or inline?
  -- mobile friendly

- props / state / redux?

- Chk: validation errors from the server?
