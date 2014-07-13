var database = require('../lib/mongodb-persister/database'),
  mongoPersister = require('../lib/mongodb-persister/mongoPersister'),
  serverUtils = require('../lib/server/utils'),
  util = require('util'),
  assert = require("chai").assert,
  expect = require("chai").expect;


describe("MongodbPersistor", function() {
  before(function(done) {
    database.config('', 'xpush',

    function(err, message) {
      if (!err) {
        console.info('  - Mongodb is connected');
        done();
      }
      else {
        process.exit(-1);
      }

    });
  });

  describe("#registration()", function() {

    // registerUser = function (_app, _userId, _password, _deviceId, _notiId, _datas, done)
    it("Register User : yohan ", function(done) {

      mongoPersister.registerUser({
        A: 'stalk.io',
        U: 'yohan',
        PW: serverUtils.encrypto('password'),
        D: 'web',
        N: '',
        DT: {
          email: 'yohany@gmail.com',
          gender: 'male',
          features: 'awesome',
          job: 'superman'
        }
      }, function(err) {
        assert.isNull(err, 'there was no error');
        done();
      });
    });

    it("Register User : james ", function(done) {

      mongoPersister.registerUser({
        A: 'stalk.io',
        U: 'james',
        PW: serverUtils.encrypto('password'),
        D: 'web',
        N: '',
        DT: {
          email: 'james@gmail.com',
          gender: 'male',
          features: 'awesome',
          job: 'superman'
        }
      }, function(err) {
        assert.isNull(err, 'there was no error');
        done();
      });
    });

    it("Register User : Ally ", function(done) {

      mongoPersister.registerUser({
        A: 'stalk.io',
        U: 'ally',
        PW: serverUtils.encrypto('password'),
        D: 'web',
        N: '',
        DT: {
          email: 'james@gmail.com',
          gender: 'male',
          features: 'awesome',
          job: 'superman'
        }
      }, function(err) {
        assert.isNull(err, 'there was no error');
        done();
      });
    });



    it("Add device to yohan ", function(done) {

      mongoPersister.addDevice({
        A: 'stalk.io',
        U: 'yohan',
        D: '1235-6783-1871234-328271384-1233-4123413251234',
        N: 'AMSDFuwehfasdf-asdfEWFHSIDhgawe-fawehfxkajecawGawg-aaAA923rhnjkag48'
      }, function(err) {
        assert.isNull(err, 'there was no error');
        done();
      });
    });


    it("Add device to james ", function(done) {

      mongoPersister.addDevice({
        A: 'stalk.io',
        U: 'james',
        D: '1235-6783-1871234-328271384-1233-4123413251234',
        N: 'AMSDFuwehfasdf-asdfEWFHSIDhgawe-fawehfxkajecawGawg-aaAA923rhnjkag48'
      }, function(err) {
        assert.isNull(err, 'there was no error');
        done();
      });
    });

    it("retrieve yohan's user information #1 ", function(done) {
      mongoPersister.retrieveUser({
        A: 'stalk.io', // _app,
        U: 'yohan',
        D: '1235-6783-1871234-328271384-1233-4123413251234'
      }, function(err, user) {
        //console.log(user);
        assert.isNull(err, 'there was no error');
        assert.isNotNull(user, 'user is not existed');
        done();
      });
    });
    it("retrieve yohan's user information #2 ", function(done) {
      mongoPersister.retrieveUser({
        A: 'stalk.io', // _app,
        U: 'yohan',
        D: 'web'
      }, function(err, user) {
        //console.log(user);
        assert.isNull(err, 'there was no error');
        assert.isNotNull(user, 'user is not existed');
        done();
      });
    });


    it("update yohan's token #1 ", function(done) {
      mongoPersister.updateUserToken({
        A: 'stalk.io', // _app,
        U: 'yohan',
        D: '1235-6783-1871234-328271384-1233-4123413251234',
        N: 'TOKEN_1234567890127462391520987'
      }, function(err, token) {
        //console.log(token);
        assert.isNull(err, 'there was no error');
        assert.isNotNull(token, 'token is not existed');
        done();
      });
    });


  });

  describe("#group()", function() {

    it("add group", function(done) {
      mongoPersister.addGroupId({
        A: 'stalk.io', // _app,
        U: ['yohan', 'james'],
        GR : 'ally'
      }, function(err) {
        assert.isNull(err, 'there was no error');
        done();
      });
    });

    it("remove group ", function(done) {
      mongoPersister.removeGroupId({
        A: 'stalk.io', // _app,
        U: 'james',
        GR: 'ally'
      }, function(err) {
        assert.isNull(err, 'there was no error');
        done();
      });
    });


    it(" group list by ally", function(done) {
      mongoPersister.listGroup({
        A: 'stalk.io',
        GR: 'ally'
      }, function(err, users) {
        assert.isNull(err, 'there was no error');
        //console.log(users);
        done();
      });
    });

  });


  describe("#channel()", function() {

    it(" createChannel", function(done) {
      mongoPersister.createChannel({
        A: 'stalk.io',
        C: 'CH01',
        U: ['yohan', 'ally']
      }, function(err, channel) {
        assert.isNull(err, 'there was no error');
        //console.log(channel);
        done();
      });
    });


    it(" createChannel", function(done) {
      mongoPersister.createChannel({
        A: 'stalk.io',
        C: 'CH02',
        U: ['yohan', 'james'],
        DT: {height: '180m', salary: '6000/y'}
      }, function(err, channel) {
        assert.isNull(err, 'there was no error');
          console.log(channel);
        done();
      });
    });



    it(" retrieve channel lists", function(done) {
      mongoPersister.listChannel({
        A: 'stalk.io',
        U: 'yohan'
      }, function(err, channels) {
        assert.isNull(err, 'there was no error');
        console.log(channels);
        console.log(channels.length);
        done();
      });
    });

    it(" exit from channel", function(done) {
      mongoPersister.exitChannel({
        A: 'stalk.io',
        C: 'CH02',
        U: 'yohan'
      }, function(err, channel) {
        assert.isNull(err, 'there was no error');
        //console.log(channel);
        done();
      });
    });

    it(" exit from channel", function(done) {
      mongoPersister.exitChannel({
        A: 'stalk.io',
        C: 'CH02',
        U: 'james'
      }, function(err, channel) {
        assert.isNull(err, 'there was no error');
        //console.log(channel);
        done();
      });
    });


  });
});
