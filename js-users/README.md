#

# TODO

#

- new user commit -> jump to the /edit/:newuserid page for more edit of the current user?
- (could be: emty new user form to be able to add next new user.)
- (could be: jump to users, to the new user to see.)
- the users table is sorted by id when arrives. User can sort with a click on the table heads.
- (would be nice to remember the user, and jump back to that page at the users.)

# Notes

- normal html check ("required") is turned off, to be able to check server-side messages.
- also removed status dropdown from user edit page (assessment says: only the two texfields)
- there were no info how long the error message should be visible. Lets say, until next submit.
- the edit and the add user form is two separated codes. It is not nice. Sorry for that.
- no info about default user status. Assuming 'active'.
- there were no request for deleting the user. Not implementing.
- TEST CASES: I had no time to create test environment, sorry for that.
- concurrent editing, data table caching: If there would be more time, I loved to create a
  layer between axios and the store, so I could check if data had been changed, update only
  if necessary etc.

## Starting from a clone of an another project

To save time, I copied an another project (it is from Brad Traversy, from an Udemy course).
I spent some time without commiting, so far I:

- spent some time testing the Api with Postman
- spent some time checking different pagers/tables/grids, which one to use.
- created a new page: /users
- created the user reducer (the base project is using redux, I just leave it as it is.)
- because of CORS, created a server-side api route, to use it as a proxy.
  (I created individual routes in the backend, for testing purposes)
- /users now can get userlist thru axios->backend->heroku and present all users on one page.

## todos

### design

Whahh. What design. Would be nice to have a pull-down edit box on the same page as the table.
This way it could be a real functional one-page-app.
-- css, scss or inline?
-- mobile friendly
