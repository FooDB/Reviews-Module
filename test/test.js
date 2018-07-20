const request = require('supertest')('http://127.0.0.1:3005');
const express = require('express');
describe('Server routes work interact successfully', () => {

    it('expects a test of the testing suite to work', () => {
        expect(true).toBe(true);
    })
    it('should fetch restaurant data by id', (done) => {
        request.get('/reviews/3', (req, res) => {
            expect(res.data.length).to.equal(170);
        })
        .expect(200)
        .end(done);
    })
    it('should be able to update the helpful data point on a review', (done) => {
        request.post('/helpfulEvent/1/id/602', (req, res) => {
            expect(req.params.is_helpful).to.equal(1);
            expect(req.params.id).to.equal(602);
        }).expect(200)
        .end(done);
    })
    it('should get the correct filtered keywords by id', (done) => {
        request.get('/filterKeywords/3')
        .expect(200)
        .expect((res) => {
            // expect(res.body).to.equal(true)
        })
        .end(done)
    })

})
describe('POST /helpfulEvent/1/id/602', function() {
    it('user.name should be an case-insensitive match for "john"', function(done) {
      request.post('/helpfulEvent/1/id/602')
        .expect(function(res) {
          expect(res.body.id).to.equal(602);
          res.body.is_helpful = 1;
        })
        .expect(200, done);
    });
  });
