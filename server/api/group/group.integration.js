'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newThing;

describe('Thing API:', function() {
  describe('GET /api/groups', function() {
    var groups;

    beforeEach(function(done) {
      request(app)
        .get('/api/groups')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          groups = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(groups).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/groups', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/groups')
        .send({
          name: 'New Thing',
          info: 'This is the brand new group!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newThing = res.body;
          done();
        });
    });

    it('should respond with the newly created group', function() {
      expect(newThing.name).to.equal('New Thing');
      expect(newThing.info).to.equal('This is the brand new group!!!');
    });
  });

  describe('GET /api/groups/:id', function() {
    var group;

    beforeEach(function(done) {
      request(app)
        .get(`/api/groups/${newThing._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          group = res.body;
          done();
        });
    });

    afterEach(function() {
      group = {};
    });

    it('should respond with the requested group', function() {
      expect(group.name).to.equal('New Thing');
      expect(group.info).to.equal('This is the brand new group!!!');
    });
  });

  describe('PUT /api/groups/:id', function() {
    var updatedThing;

    beforeEach(function(done) {
      request(app)
        .put(`/api/groups/${newThing._id}`)
        .send({
          name: 'Updated Thing',
          info: 'This is the updated group!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedThing = {};
    });

    it('should respond with the updated group', function() {
      expect(updatedThing.name).to.equal('Updated Thing');
      expect(updatedThing.info).to.equal('This is the updated group!!!');
    });

    it('should respond with the updated group on a subsequent GET', function(done) {
      request(app)
        .get(`/api/groups/${newThing._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let group = res.body;

          expect(group.name).to.equal('Updated Thing');
          expect(group.info).to.equal('This is the updated group!!!');

          done();
        });
    });
  });

  describe('PATCH /api/groups/:id', function() {
    var patchedThing;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/groups/${newThing._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Thing' },
          { op: 'replace', path: '/info', value: 'This is the patched group!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedThing = {};
    });

    it('should respond with the patched group', function() {
      expect(patchedThing.name).to.equal('Patched Thing');
      expect(patchedThing.info).to.equal('This is the patched group!!!');
    });
  });

  describe('DELETE /api/groups/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/groups/${newThing._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when group does not exist', function(done) {
      request(app)
        .delete(`/api/groups/${newThing._id}`)
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
