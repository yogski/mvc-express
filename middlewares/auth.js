var express = require('express');
var Strategy = require('passport-http-bearer').Strategy;
var db = require('../models');

// available roles
const ROLES = ['SuperAdmin', 'PlayerUser'];

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

async function roleCheck(req, res, next) {
  try {
    var accessToken = await req.headers.authorization.split(" ");
    const user = await db.User.findOne({
      where: { token: accessToken[1]}
    })
    // user not found
    if (!user) {
      res.status(401).json({
        message : "401 unauthorized"
      })
    }
    // role is invalid 
    if (!ROLES.includes(user.role)) {
      res.status(401).json({
        message : "401 Invalid Role"
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      message : error.message
    })  
  }
}

async function adminCheck(req, res, next) {
  try {
    var accessToken = await req.headers.authorization.split(" ");
    const user = await db.User.findOne({
      where: { token: accessToken[1]}
    })
    // user not found
    if (!user) {
      res.status(401).json({
        message : "401 unauthorized"
      })
    }
    // role is invalid 
    if (!ROLES.includes(user.role)) {
      res.status(401).json({
        message : "401 Invalid Role"
      })
    }
    if (user.role === "SuperAdmin") {
      // is admin
      next();
    } else {
      // not admin
      res.status(403).json({
        message : "403 Forbidden"
      })
    }
  } catch (error) {
    res.status(500).json({
      message : error.message
    })  
  }
}

module.exports = { bearer, roleCheck, adminCheck }