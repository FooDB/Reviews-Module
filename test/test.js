import React from 'react';
const request = require('supertest')('http://127.0.0.1:3005');
import { shallow, mount } from 'enzyme';
// import App from '../client/components/App.jsx';
import FilterBox from '../client/components/FilterBox.jsx'
import LovedForBox from '../client/components/LovedForBox';
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
    // it('should get the correct filtered keywords by id', (done) => {
    //     request.get('/filterKeywords/3')
    //     .expect(200)
    //     .expect(function(res) {
    //         expect(res.body).to.equal(true);
    //     })
    //     .end(done)
    // })

})
describe('FilterBox', () => {
    it('should start as an empty box icon and toggle to red on click', () => {
        const wrapper = mount(<FilterBox filterReviews={console.log.bind(this)} keyWord={{filterKeyword: ''}}/>);
        let testState = wrapper.state();
        expect(testState.icon).toBe('./images/emptyBox.png');
        expect(testState.clicked).toBe(false);
        wrapper.find('.filterCheckBox').simulate('click');
        testState = wrapper.state();
        expect(testState.clicked).toBe(true);
        expect(testState.icon).toBe('./images/redBox.png');
        wrapper.find('.filterCheckBox').simulate('click');
        testState = wrapper.state();
        expect(testState.clicked).toBe(false);
        expect(testState.icon).toBe('./images/emptyBox.png');
    })
})
describe('lovedForBox', () => {
    const component = mount(<LovedForBox lovedFor={{menuItem: 'Steak'}}/>);
    it('should display the menuitem as text', () => {
        expect(component.find('#menuItem').text()).toBe('Steak ');
    })
    it('should display the trophy icon as a clickable link', () => {
        expect(component.html()).toBe("<a><span class=\"filterCheckBox\"><span><img class=\"star\" src=\"./images/trophy.png\"> </span><span id=\"menuItem\">Steak </span></span></a>");
    })
})
// describe("<Logo />", () => {
//     it("renders an image with src correctly", () => {
//       const wrapper= shallow(<Logo src="yourlogo.png" />);
//       expect(wrapper.html()).toEqual('<img src="yourlogo.png"/>'); // implement your ".toEqual(...)" to your Logo component result 
//     });
//   });
//   const wrapper = mount(<Logo src="blah..."/>);
// expect(wrapper.find({ prop: 'src' })).to.have.length(1);