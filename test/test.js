import React from 'react';
import { shallow, mount } from 'enzyme';
import Review from '../client/components/Review';
import FilterBox from '../client/components/FilterBox';
import LovedForBox from '../client/components/LovedForBox';
import Pagination from '../client/components/Pagination';
import ReportPopUp from '../client/components/ReportPopUp';
import ReviewSummary from '../client/components/ReviewSummary';
import App from '../client/components/App';
import { wrap } from 'module';
import ReviewToolbar from '../client/components/ReviewToolbar';
import RatingBar from '../client/components/RatingBar';
import UnCheckedIcon from '../client/components/UnCheckedIcon';
import ErrorBoundary from '../client/components/Error';
import ReviewList from '../client/components/ReviewList';
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
        dinedDate: "2018-07-20T07:00:00.000Z",
        overallRating: 3,
      }}
    />);
    let state = wrapperMount.state();
    expect(state.stars[1]).toBe('https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redStar.png')
    expect(state.stars[4]).toBe('https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/greyStar.png')
  })
  it('should change the date data into a more readable format', () => {
    expect(wrapper.find('.reviewRatingDate').text()).toBe(" Dined on Fri Jul 20 2018")
  })
  it('should offer to read more less depending on the length of the review', () => {
    const wrapper2 = mount(<Review
      review={{
        is_helpful: 0,
        dinedDate: "2018-07-20T07:00:00.000Z",
        userName: 'Christopher Wildenradt',
        reviewText: 'longwinded test review text that has to get past 200 characters in length longwinded test review text that has to get past 200 characters in length longwinded test review text that has to get past 200 characters in length longwinded test review text that has to get past 200 characters in length',
      }}
    />);
    expect(wrapper2.find('#readMore').text()).toBe('+ Read more');
    wrapper2.find('#readMore').simulate('click', {preventDefault: () => {}});
    expect(wrapper2.find('#readMore').text()).toBe('- Read less');
  })
  it('should set the colors randomly', () => {
    wrapper.instance().setColor();
    expect(wrapper.state().randomColor).toBe('#df4e96' || '#bb6acd' || '#6c8ae4' || '#d86441') 
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
    percentages={['23%', '24%', '25%', '26%', '27%', '28%']}
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
  it ('should should display 6 rating bars when given an array of 6 percentages', () => {
    expect(wrapper.find('#summaryToolbarContainer').html()).toBe('<div id=\"summaryToolbarContainer\"><div><div class=\"toolbarAndNumber\"><span class=\"toolbarNumber\">5</span><div class=\"toolbar-light-background\"><div class=\"toolbar-red\" style=\"width:27%\"></div></div></div><div class=\"toolbarAndNumber\"><span class=\"toolbarNumber\">4</span><div class=\"toolbar-light-background\"><div class=\"toolbar-red\" style=\"width:26%\"></div></div></div><div class=\"toolbarAndNumber\"><span class=\"toolbarNumber\">3</span><div class=\"toolbar-light-background\"><div class=\"toolbar-red\" style=\"width:25%\"></div></div></div><div class=\"toolbarAndNumber\"><span class=\"toolbarNumber\">2</span><div class=\"toolbar-light-background\"><div class=\"toolbar-red\" style=\"width:24%\"></div></div></div><div class=\"toolbarAndNumber\"><span class=\"toolbarNumber\">1</span><div class=\"toolbar-light-background\"><div class=\"toolbar-red\" style=\"width:23%\"></div></div></div><div class=\"toolbarAndNumber\"><span class=\"toolbarNumber\">0</span><div class=\"toolbar-light-background\"><div class=\"toolbar-red\"></div></div></div></div></div>')
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

describe('ReportPopUp', () => {
  const wrapper = shallow(<ReportPopUp />)
  expect(wrapper.html()).toBe('<div id=\"modalContainer\"><div class=\"modalBackground\"><div class=\"modalContent\"><div id=\"reviewReport\"><div id=\"reportHeadContainer\"><div id=\"reportHeadText\"><strong>Report this review as inappropriate?</strong></div></div><div id=\"reportBodyContainer\"><div id=\"reportBodyText\"><strong>If you believe this review should be removed from OpenTable, please let us know and someone will investigate.</strong></div><form><input type=\"hidden\"/><textarea id=\"reviewReasonText\" placeholder=\"Tell us why you find the review inappropriate.\" required=\"\"></textarea><div id=\"reportButtonsContainer\"><button id=\"reportConfirm\" type=\"submit\">Report</button><button id=\"reportCancel\" type=\"button\">Cancel</button></div></form></div></div></div></div></div>')
})

describe('App', () => {
  const wrapper = shallow(<App />);
  it('should show no reviews data when there are no reviews', () => {
    expect(wrapper.html()).toBe('<h3>No reviews data available</h3>')
  })
  it('should get the correct percentages based on reviews rating data', () => {
    wrapper.setState({allReviews: [{overallRating: 5, dinedDate: 'test', userName: 'Chris W', reviewDate: '03-04-05'}]})
    wrapper.instance().getRatingPercentages()
    expect(wrapper.state().percentages).toEqual(["100%", "0%", "0%", "0%", "0%"]);
  })
  it('should set it to 3 red stars, 1 low star, and 1 white star when the total average rating is 3.1', () => {
    wrapper.setState({ratings: {totalAverage: 3}});
    wrapper.instance().setDynamicStarRating();
    expect(wrapper.state().stars).toEqual(["https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redStar.png", "https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redStar.png", "https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redStar.png", "https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/lowStar.png", "https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/greyStar.png"]);
  })
  it('should change the current page on handlePageChange calls', () => {
    expect(wrapper.state().currentPage).toBe(1) 
    wrapper.instance().handlePageChange(2);
    expect(wrapper.state().currentPage).toBe(2)
  })

})

describe('RatingBar', () => {
  const wrapper = shallow(<RatingBar i={1} percentages={['23%', '24%', '25%', '26%', '27%', '28%']}/>)
  expect(wrapper.html()).toBe('<div class=\"toolbarAndNumber\"><span class=\"toolbarNumber\">4</span><div class=\"toolbar-light-background\"><div class=\"toolbar-red\" style=\"width:26%\"></div></div></div>')
})

describe('UnChekedIcon', () => {
  const wrapper = shallow(<UnCheckedIcon />)
  it('should render the correct svg when called', () => {
    expect(wrapper.html()).toBe('<svg id=\"UnCheckedIcon\" x=\"0px\" y=\"0px\" width=\"18px\" height=\"18px\" viewBox=\"0 0 430.602 430.602\"><g><path d=\"M215.301,60c41.482,0,80.481,16.154,109.814,45.486c29.332,29.332,45.485,68.332,45.485,109.814 c0,41.481-16.153,80.481-45.485,109.813c-29.333,29.332-68.332,45.486-109.814,45.486c-41.482,0-80.481-16.154-109.814-45.486 C76.155,295.781,60.001,256.781,60.001,215.3c0-41.482,16.154-80.482,45.486-109.814C134.82,76.155,173.819,60,215.301,60 M215.301,0C96.394,0,0,96.394,0,215.301s96.394,215.301,215.301,215.301s215.301-96.394,215.301-215.301S334.208,0,215.301,0 L215.301,0z\"></path></g></svg>')
  })
})

describe('Error', () => {
  const wrapper = shallow(<ErrorBoundary />)
  it('should change error to true on error', () => {
    expect(wrapper.state().hasError).toBe(true)
  })
  wrapper.instance().componentDidCatch();
})

// describe('ReviewList', () => {
//   const wrapper = shallow(<ReviewList reviews={[{reviewText: 'test', dinedDate: 'test', userName: 'Chris W', reviewDate: '03-04-05'}]}/>)
//   it('should pass reviews data down', () => {
//     expect(wrapper.html()).toBe('')
//   })
// })
