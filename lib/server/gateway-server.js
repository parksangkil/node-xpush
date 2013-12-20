var events  = require('events'),
    restify = require('restify'),
    util    = require('util'),
    _       = require('underscore');
    NodeManager = require('../node-manager/node-manager.js').NodeManager;

var GatewayServer = exports.GatewayServer = function (options) {
  if (!options || !options.port) {
    throw new Error('Both `options` and `options.port` are required.');
  }

  events.EventEmitter.call(this);
  
  var self  = this;

  var conf = {
    version: module.exports.version
  };
  if(options.restify) conf = _.extend(conf, options.restify);

  this.nodeManager = new NodeManager(
    conf && conf.zookeeper && conf.zookeeper.address ? conf.zookeeper.address : ''
  );

  this.server = restify.createServer(conf);
  this.server.use(restify.queryParser());
  this.server.use(restify.jsonp());

  this.server.get('/channel/:cname', function (req, res, next) {
    res.send({hello: 'world', test: req.params.cname});
    //res.header('Location', 'http://stalk.io');
    //res.send(302);
    next();
  });

  this.server.listen(options.port, function () {
    self.emit('connected', self.server.url, options.port);
  });
};

util.inherits(GatewayServer, events.EventEmitter);

GatewayServer.prototype.test = function () {
  console.log('dddddddd');
};