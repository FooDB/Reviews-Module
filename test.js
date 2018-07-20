const request = require('supertest')('http://127.0.0.1:3005');

it('expects a test of the testing suite to work', () => {
    expect(true).toBe(true);
})
it('should fetch restaurant data by id', (done) => {
    request.get('/reviews/3', (err, res) => {
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
