var express = require('express');
var Strategy = require('passport-http-bearer').Strategy;
var db = require('../models');

// Configure the Bearer strategy for use by Passport.
//
// The Bearer strategy requires a `verify` function which receives the
// credentials (`token`) contained in the request.  The function must invoke
// `cb` with a user object, which will be set at `req.user` in route handlers
// after authentication.
const bearer = new Strategy(
  async function(token, cb) {
    try {
      const user = await db.User.findAll({
        where: { token: token }
      })
      if (user.length > 0) {
        return cb(null, user);
      } else {
        return cb(null, false);
      }    
    } catch (error) {
      return cb(error);
    }
  } 
);

module.exports = { bearer }