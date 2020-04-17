const express = require('express');
const axios = require('axios');
const router = express.Router();

const URL_BASE = 'http://js-assessment-backend.herokuapp.com';

// @route    GET api/js-backend/users/:id
// @desc     Get all the users from the js-backend
// @access   Public
router.get('/:userid', async (req, res) => {
  let userData;
  console.log("Getting user", req.params.userid)

  try {
    userData = await axios.get(`${URL_BASE}/users/${req.params.userid}`);
  } catch (err) {
    console.error("Error with backend:", err.message);
    res.status(500).send('Server Error');
  }
  res.status(200).send(userData.data)
});



// @route    GET api/js-backend/users
// @desc     Get all the users from the js-backend
// @access   Public
router.get('/', async (req, res) => {

  let userlist;
  console.log("Getting userlist")

  try {
    userlist = await axios.get(`${URL_BASE}/users.json`);
  } catch (err) {
    console.error("Error with backend:", err.message);
    res.status(500).send('Server Error');
  }
  console.log(userlist.data.length)
  // const answer = JSON.parse(userlist.data)
  // console.log("sending", answer.length, "rows.")
  res.status(200).send(userlist.data)
});


module.exports = router;
