import React from 'react';
import { shallow, mount } from 'enzyme';
import Review from '../client/components/Review';
import FilterBox from '../client/components/FilterBox'
import LovedForBox from '../client/components/LovedForBox';
import Pagination from '../client/components/Pagination';
const request = require('supertest')('http://127.0.0.1:3005');

describe('Server routes interact successfully', () => {
  it('should fetch reviews data by restaurant id', (done) => {
    request.get('/reviews/3')
      .expect((res) => {
        expect(res.body.length).toBe(276);
      })
      .expect(200)
      .end(done);
  })
  it('should update the helpful data point on a review', (done) => {
    request.post('/helpfulEvent/1/id/362')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        request.get('/reviews/3')
          .expect((res) => {
            expect(res.body[0].is_helpful).toBe(1);
          })
          .end(done);
      });
  })
  it('should get the filtered keywords by id', (done) => {
    request.get('/filterKeywords/3')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(5);
        expect(res.body[0].filterKeyword).toBe('aut.');
      })
      .end(done)
  })
  it('should get the LovedFor items by id', (done) => {
    request.get('/LovedFor/3')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(5);
        expect(res.body[1].menuItem).toBe('ut.')
      })
      .end(done);
  })
})
describe('FilterBox', () => {
  it('should start as an empty box icon and toggle to red on click', () => {
    const wrapper = mount(<FilterBox filterReviews={() => ''} keyWord={{filterKeyword: ''}}/>);
    let testState = wrapper.state();
    expect(testState.icon).toBe('https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/emptyBox.png');
    expect(testState.clicked).toBe(false);
    wrapper.find('.filterCheckBox').simulate('click');
    testState = wrapper.state();
    expect(testState.clicked).toBe(true);
    expect(testState.icon).toBe('https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redBox.png');
    wrapper.find('.filterCheckBox').simulate('click');
    testState = wrapper.state();
    expect(testState.clicked).toBe(false);
    expect(testState.icon).toBe('https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/emptyBox.png');
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

describe('Review', () => {
  const wrapper = shallow(<Review
    review={{
      is_helpful: 0,
      reviewText: 'test review',
      dinedDate: '2018-04-12',
    }}
  />);
  it('should change the helpful state on click', () => {
    let startState = wrapper.state();
    expect(startState.helpful).toBe(false);
    wrapper.find('#placeholder').simulate('click');
    startState = wrapper.state();
    expect(startState.helpful).toBe(true);
  })
})

describe('ReviewToolbar', () => {

})

describe('Pagination', () => {
  const wrapper = shallow(<Pagination currentPage={1}totalPages={53} />);
  const wrapper2 = shallow(<Pagination currentPage={52}totalPages={53} />);
  it('should have the totalPages count be the text on the last bubble', () => {
    expect(wrapper.find('#last').text()).toBe('53');
  })
  it('should display the first ellipsis bubble only if currentPage is 4 or greater', () => {
    expect(wrapper.find('#firstEllipsis')).toBeFalsy
    expect(wrapper2.find('#firstEllipsis').html()).toBe("<span class=\"ellipsisBubble\" id=\"firstEllipsis\">···</span>")
  })
  it('should display the second ellipsis bubble only if total pages is over 3 more than the current page', () => {
    expect(wrapper.find('#secondEllipsis').html()).toBe("<span class=\"ellipsisBubble\" id=\"secondEllipsis\">···</span>")
    expect(wrapper2.find('#secondEllipsis')).toBeFalsy
  })
})