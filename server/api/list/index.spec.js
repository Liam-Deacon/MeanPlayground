'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var listCtrlStub = {
  index: 'listCtrl.index',
  show: 'listCtrl.show',
  create: 'listCtrl.create',
  upsert: 'listCtrl.upsert',
  patch: 'listCtrl.patch',
  destroy: 'listCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var listIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './list.controller': listCtrlStub
});

describe('list API Router:', function() {
  it('should return an express router instance', function() {
    expect(listIndex).to.equal(routerStub);
  });

  describe('GET /api/lists', function() {
    it('should route to list.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'listCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/lists/:id', function() {
    it('should route to list.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'listCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/lists', function() {
    it('should route to list.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'listCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/lists/:id', function() {
    it('should route to list.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'listCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/lists/:id', function() {
    it('should route to list.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'listCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/lists/:id', function() {
    it('should route to list.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'listCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
