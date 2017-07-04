'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newlist;

describe('list API:', function() {
  describe('GET /api/lists', function() {
    var lists;

    beforeEach(function(done) {
      request(app)
        .get('/api/lists')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          lists = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(lists).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/lists', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/lists')
        .send({
          name: 'New list',
          info: 'This is the brand new list!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newlist = res.body;
          done();
        });
    });

    it('should respond with the newly created list', function() {
      expect(newlist.name).to.equal('New list');
      expect(newlist.info).to.equal('This is the brand new list!!!');
    });
  });

  describe('GET /api/lists/:id', function() {
    var list;

    beforeEach(function(done) {
      request(app)
        .get(`/api/lists/${newlist._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          list = res.body;
          done();
        });
    });

    afterEach(function() {
      list = {};
    });

    it('should respond with the requested list', function() {
      expect(list.name).to.equal('New list');
      expect(list.info).to.equal('This is the brand new list!!!');
    });
  });

  describe('PUT /api/lists/:id', function() {
    var updatedlist;

    beforeEach(function(done) {
      request(app)
        .put(`/api/lists/${newlist._id}`)
        .send({
          name: 'Updated list',
          info: 'This is the updated list!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedlist = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedlist = {};
    });

    it('should respond with the updated list', function() {
      expect(updatedlist.name).to.equal('Updated list');
      expect(updatedlist.info).to.equal('This is the updated list!!!');
    });

    it('should respond with the updated list on a subsequent GET', function(done) {
      request(app)
        .get(`/api/lists/${newlist._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let list = res.body;

          expect(list.name).to.equal('Updated list');
          expect(list.info).to.equal('This is the updated list!!!');

          done();
        });
    });
  });

  describe('PATCH /api/lists/:id', function() {
    var patchedlist;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/lists/${newlist._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched list' },
          { op: 'replace', path: '/info', value: 'This is the patched list!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedlist = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedlist = {};
    });

    it('should respond with the patched list', function() {
      expect(patchedlist.name).to.equal('Patched list');
      expect(patchedlist.info).to.equal('This is the patched list!!!');
    });
  });

  describe('DELETE /api/lists/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/lists/${newlist._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when list does not exist', function(done) {
      request(app)
        .delete(`/api/lists/${newlist._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
