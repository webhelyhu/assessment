const express = require('express');
const axios = require('axios');
const router = express.Router();

const URL_BASE = 'http://js-assessment-backend.herokuapp.com';

// @route    GET api/js-backend/users/:id
// @desc     Get all the users from the js-backend
// @access   Public
router.get('/:userid', async (req, res) => {
  let userData;
  console.log("Getting ", `${URL_BASE}/users/${req.params.userid}`)

  try {
    userData = await axios.get(`http://js-assessment-backend.herokuapp.com/users/1000`,
      {
        headers:
        {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
    res.status(200).send(userData.data)
  } catch (err) {
    console.error("Error with backend:", err.message);
    res.status(500).send('Server Error ' + JSON.stringify(err));
  }
});



// @route    GET api/backend
// @desc     Get all the users from the js-backend
// @access   Public
router.get('/', async (req, res) => {

  let userlist;
  console.log("Getting userlist")

  try {
    userlist = await axios.get(`${URL_BASE}/users.json`);
  } catch (err) {
    console.error("Error with backend:", err.message);
    res.status(500).send('Server Error ' + JSON.stringify(err));
  }
  console.log(userlist.data.length)
  // const answer = JSON.parse(userlist.data)
  // console.log("sending", answer.length, "rows.")
  res.status(200).send(userlist.data)
});




// @route    POST api/backend
// @desc     Create a new user
// @access   Public
router.post(
  '/', [],
  async (req, res) => {

    let newUserData;
    console.log("Creating new user")
    console.log(req.body)
    const body = req.body;
    const config = {
      headers:
      {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    };

    try {
      newUserData = await axios.post(`${URL_BASE}/users.json`, body, config);
      console.log(newUserData.data)
      res.status(201).send(newUserData.data);

    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
      res.status(500).send('Server Error ' + JSON.stringify(err));
    }
    console.log("Creating finished.")
  }
);



module.exports = router;