const express = require('express');
const axios = require('axios');
const router = express.Router();

const URL_BASE = 'http://js-assessment-backend.herokuapp.com';

// const naplo = (...props) => console.log(...props)
const naplo = () => { }

// @route    GET api/backend/:id
// @desc     Get all the users from the js-backend
// @access   Public
router.get('/:userid', async (req, res) => {
  let userData;
  naplo("Getting ", `${URL_BASE}/users/${req.params.userid}`)

  try {
    userData = await axios.get(`http://js-assessment-backend.herokuapp.com/users/${req.params.userid}`,
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
  naplo("Getting userlist")

  try {
    userlist = await axios.get(`${URL_BASE}/users.json`);
  } catch (err) {
    console.error("Error with backend:", err.message);
    res.status(500).send('Server Error ' + JSON.stringify(err));
  }
  naplo(userlist.data.length)
  // const answer = JSON.parse(userlist.data)
  // naplo("sending", answer.length, "rows.")
  res.status(200).send(userlist.data)
});




// @route    POST api/backend
// @desc     Create a new user
// @access   Public
router.post(
  '/', [],
  async (req, res) => {

    let newUserData;
    naplo("Creating new user")
    naplo(req.body)
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
      naplo(newUserData.data)
      res.status(201).send(newUserData.data);

    } catch (err) {
      console.error('Server Error: ' + err.message);

      if (typeof err === 'object' && typeof err.response === 'object') {
        // we got response error, we can use response
        res.status(err.response.status).send(err.response.data);
      } else {
        // some other type of error.
        res.status(500).send("Server error" + JSON.stringify(err));
      }

    }

    naplo("Creating finished.")
  }
);



// @route    PATCH api/backend/:id
// @desc     Update a user
// @access   Public
router.patch(
  '/:userid', [],
  async (req, res) => {

    let newUserData;
    // naplo("Patching ", `${URL_BASE}/users/${req.params.userid}`)
    const body = req.body;
    const config = {
      headers:
      {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    };

    try {
      newUserData = await axios.patch(`${URL_BASE}/users/${req.params.userid}`, body, config);
      naplo("Done updating. Answer: ", newUserData.data)
      res.status(201).send(newUserData.data);

    } catch (err) {
      console.error('Server Error: ' + err.message);

      if (typeof err === 'object' && typeof err.response === 'object') {
        // we got response error, we can use response
        res.status(err.response.status).send(err.response.data);
      } else {
        // some other type of error.
        res.status(500).send("Server error" + JSON.stringify(err));
      }

    }
    naplo("Updating finished.")
  }
);


module.exports = router;