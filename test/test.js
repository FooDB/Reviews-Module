import React from 'react';
const request = require('supertest')('http://127.0.0.1:3005');
import { shallow } from 'enzyme';
import FilterBox from '../client/components/FilterBox';
describe('Server routes interact successfully', () => {

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
        .expect(function(res) {
            expect(res.body).to.equal(true);
        })
        .end(done)
    })

})
describe('FilterBox', () => {
    it('should have a test state of 1', () => {
        const wrapper = shallow(<FilterBox />);
        const testState = wrapper.state().test;
        expect(testState).toBe(1);
    })
})