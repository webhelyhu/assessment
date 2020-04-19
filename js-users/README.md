# Notes

I am quite sad that the designer disappeared. I am not a designer, I was thinking
about something awesome... Well, I only had this pumpkin thing...

## Server side

There is a simple proxy server set up because of the CORS. I also had to play with
Postman a little, to figure out how things work. This is why I do not use express'
proxy, rather defining the routes myself.

## Just an idea: Multi

I know the assessment spoke about separate pages... but... I think it would be nice
to have both functionalities in one page. Well, I created a "Multi" page, but it
is not ready. It just shows the idea. It would take some more time to

- the editor is hidden by default (only the NEW button shows)
- if you click on a row (first name), the editor opens, with the clicked user.

Also, there is an alternative way to show the editor window (same width than the users
and also responsive)

## Lots of "what to do, when...?" questions

- After a new user is commited, shall we stay at the new user form or go back to the
  users list? I picked a third method: jump to editing the user

- what to do when somebody calls /edit without userid? I assume he/she wants to create
  a new user.

- What shall be the sorting of the users list? The unordered list is jumping around,
  so I decided to sort the table by userid (even if it is not shown as asked). You can
  sort the table by clicking on the header

- etc.

## Notes about the code, coding

- normal html check ("required") is turned off, to be able to check server-side messages.
- also commented out status dropdown from user edit page (assessment says: only the two texfields)
- no info about default user status. Assuming 'active'.
- there were no request for deleting the user. Not implementing. (working in Postman)
- TEST CASES: I had no time to create test environment, sorry for that.
- To save time, I cloned an another project (it is from Brad Traversy, from an Udemy course),
  and started to work with that. Well, he used a global App.css (well, for a small project it
  is okay, but...), and lots of other things may just hang around unused in the files. Sorry for that.

Thanks!
