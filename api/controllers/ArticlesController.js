/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var moment = require('moment');

module.exports = {
  list: function(req, res) {
    Articles.find({}).exec(function(err, articles){
      if(err) {
        res.send(500, {err: 'Database Error'});
      }
      res.view('pages/list', {articles:articles});
    });
  },
  add: function(req, res) {
    res.view('pages/add');
  },
  create: function(req, res) {
    var title = req.body.title;
    var body = req.body.body;

    Articles.create({title:title, body:body}).exec(function(err){
      if(err) {
        res.send(500, {err: 'Database Error'});
      }
      res.redirect('/articles/list');
    });
  },
  delete: function(req, res) {
    Articles.destroy({id: req.param('id')}).exec(function(err){
      if(err) {
        res.send(500, {err: 'Database Error'});
      }
      res.redirect('/articles/list');
    });

    return false;
  },
  edit:function(req, res) {
    Articles.findOne({id: req.param('id')}).exec(function(err, article){
      if(err) {
        res.send(500, {err: 'Database Error'});
      }
      res.view('pages/edit', {article:article});
    });
  },
  update: function(req, res) {
    var title = req.body.title;
    var body = req.body.body;

    Articles.update({id: req.param('id')},{title:title, body:body}).exec(function(err){
      if(err) {
        res.send(500, {err: 'Database Error'});
      }
      res.redirect('/articles/list');
    });

    return false;
  },
  show: function(req, res) {
    Articles.findOne({id: req.param('id')}).exec(function(err, article){
      if(err) {
        res.send(500, {err: 'Database Error'});
      }
      let createdAtHumanized = moment(article.createdAt).format('LLLL');
      let updatedAtHumanized = moment(article.updatedAt).format('LLLL');

      res.view('pages/show', {article:article, createdAt:createdAtHumanized, updatedAt:updatedAtHumanized});
    });
  }
};

