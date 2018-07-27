import React from 'react';
import { shallow, mount } from 'enzyme';
import Review from '../client/components/Review';
import FilterBox from '../client/components/FilterBox';
import LovedForBox from '../client/components/LovedForBox';
import Pagination from '../client/components/Pagination';
import ReportPopUp from '../client/components/ReportPopUp';
import ReviewSummary from '../client/components/ReviewSummary';
import { wrap } from 'module';
import ReviewToolbar from '../client/components/ReviewToolbar';
const request = require('supertest')('http://127.0.0.1:3005');

describe('Server routes interact successfully', () => {
  it('should fetch reviews data by restaurant id', (done) => {
    request.get('/reviews/3')
      .expect((res) => {
        expect(res.body.length).toBe(276);
      })
      .expect(200)
      .end(done);
  });
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
  });
  it('should get the filtered keywords by id', (done) => {
    request.get('/filterKeywords/3')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(5);
        expect(res.body[0].filterKeyword).toBe('aut.');
      })
      .end(done);
  });
  it('should get the LovedFor items by id', (done) => {
    request.get('/LovedFor/3')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(5);
        expect(res.body[1].menuItem).toBe('ut.');
      })
      .end(done);
  });
});
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
  });
});

describe('lovedForBox', () => {
  const component = mount(<LovedForBox lovedFor={{menuItem: 'Steak'}}/>);
  it('should display the menuitem as text', () => {
    expect(component.find('#menuItem').text()).toBe('Steak ');
  });
  it('should display the trophy icon as a clickable link', () => {
    expect(component.html()).toBe("<a><span class=\"lovedForBox\"><span><img class=\"lovedForIcon\" src=\"https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/trophy.png\" alt=\"trophy\"></span><span id=\"menuItem\">Steak </span></span></a>");
  });
});

describe('Review', () => {
  const wrapper = shallow(<Review
    review={{
      is_helpful: 0,
      reviewText: 'longwinded test review text that has to get past 200 characters in length longwinded test review text that has to get past 200 characters in length longwinded test review text that has to get past 200 characters in length longwinded test review text that has to get past 200 characters in length',
      dinedDate: "2018-07-20T07:00:00.000Z",
      userName: 'Christopher Wildenradt',
      userReviewCount: 1,
      overallRating: 3,
    }}
  />);
  it('should change the helpful state on click', () => {
    let state = wrapper.state();
    expect(state.helpful).toBe(false);
    wrapper.find('#placeholder').simulate('click');
    state = wrapper.state();
    expect(state.helpful).toBe(true);
  });
  it('should display the user\s initials', () => {
    expect(wrapper.find('#reviewInitials').text()).toBe('CW');
  });
  it('should display more text on a click of read more', () => {
    let state = wrapper.state();
    expect(state.reviewText.length).toBeLessThan(204);
    wrapper.find('#readMore').simulate('click', {preventDefault: () => {}});
    state = wrapper.state();
    expect(state.reviewText.length).toBeGreaterThan(204);
  })
  it('should display review if the user has only one review', () => {
    expect(wrapper.find('#reviewCountText').text()).toBe("  1 review")
  })
  it('should display the number of red stars equivalent to the overall Rating', () => {
    const wrapperMount = mount(<Review
      review={{
        is_helpful: 0,
        reviewText: 'longwinded test review text that has to get past 200 characters in length longwinded test review text that has to get past 200 characters in length longwinded test review text that has to get past 200 characters in length longwinded test review text that has to get past 200 characters in length',
        userName: 'Christopher Wildenradt',
        userReviewCount: 1,
        overallRating: 3,
        dinedDate: "2018-07-20T07:00:00.000Z"
      }}
    />);
    let state = wrapperMount.state();
    expect(state.stars[2]).toBe('https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redStar.png')
    expect(state.stars[3]).toBe('https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/greyStar.png')
  })
  it('should change the date data into a more readable format', () => {
    expect(wrapper.find('.reviewRatingDate').text()).toBe(" Dined on Fri Jul 20 2018")
  })
  it('should offer to read more less depending on the length of the review', () => {
    const wrapper = mount(<Review
      review={{
        is_helpful: 0,
        dinedDate: "2018-07-20T07:00:00.000Z",
        userName: 'Christopher Wildenradt',
        reviewText: 'longwinded test review text that has to get past 200 characters in length longwinded test review text that has to get past 200 characters in length longwinded test review text that has to get past 200 characters in length longwinded test review text that has to get past 200 characters in length',
      }}
    />);
    expect(wrapper.find('#readMore').text()).toBe('+ Read more');
    wrapper.find('#readMore').simulate('click', {preventDefault: () => {}});
    expect(wrapper.find('#readMore').text()).toBe('- Read less');
  })
});

describe('ReviewToolbar', () => {
const wrapper = shallow(<ReviewToolbar keyWords={['first', 'second']}/>)
  it('should return display the up arrow, then down arrow after click of dropdown', () => {
    let state = wrapper.state();
    expect(state.arrow).toBe('https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/downArrow.png')
    wrapper.find('#dropdownHeader').simulate('click', {target: {textContent: 'this'}});
    state = wrapper.state();
    expect(state.arrow).toBe('https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/upArrow.png')
  })
});

describe('ReviewSummary', () => {
  const wrapper = shallow(<ReviewSummary
    reviews={[]}
    allReviews={[{id: 1}, {id: 2}]}
    ratings={{
      noise: 2,
      recommended: 87,
      totalAverage: 2.9,
    }}
    stars={[]}
    lovedFor={[]}
    restaurantInfo={[]}
  />);
  it('should display the length of reviews in the title', () => {
    expect(wrapper.find('.summaryHeader').text()).toBe("What 2 People Are Saying")
  })
  it('should display the noise rating as the appropriate word', () => {
    expect(wrapper.find('#summaryNoiseLevel').text()).toBe(" Loud")
  })
  it('should display the ratings recommended prop with the proper text', () => {
    expect(wrapper.find('#recommendedText').text()).toBe("87% of people would recommend it to a friend")
  })
  it('should display the total ratings with the proper text', () => {
    expect(wrapper.find('#summaryStarText').text()).toBe("   2.9 Based on Recent Ratings")
  })
})

describe('Pagination', () => {
  const wrapper = shallow(<Pagination currentPage={1}totalPages={53} />);
  const wrapper2 = shallow(<Pagination currentPage={52}totalPages={53} />);

  it('should have the totalPages count be the text on the last bubble and current page on the first bubble', () => {
    expect(wrapper.find('#last').text()).toBe('53');
    expect(wrapper.find('#selectedBubble').text()).toBe('1');
  });
  it('should display the first ellipsis bubble only if currentPage is 4 or greater', () => {
    expect(wrapper.find('#firstEllipsis')).toBeFalsy;
    expect(wrapper2.find('#firstEllipsis').html()).toBe("<span class=\"ellipsisBubble\" id=\"firstEllipsis\">···</span>");
  });
  it('should display the second ellipsis bubble only if total pages is over 3 more than the current page', () => {
    expect(wrapper.find('#secondEllipsis').html()).toBe("<span class=\"ellipsisBubble\" id=\"secondEllipsis\">···</span>");
    expect(wrapper2.find('#secondEllipsis')).toBeFalsy;
  });
  it('should display the correct numbers in order when current page is 3 more than 1 and 3 less than total pages', () => {
    const wrapper3 = shallow(<Pagination currentPage={6}totalPages={53} />);
    expect(wrapper3.find('#last').text()).toBe('53');
    expect(wrapper3.find('#first').text()).toBe('1');
    expect(wrapper3.find('#middleLeft').text()).toBe('5');
    expect(wrapper3.find('#selectedBubble').text()).toBe('6');
    expect(wrapper3.find('#middleRight').text()).toBe('7');
  })
});