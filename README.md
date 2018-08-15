# Project Name
  - Reviews Module

## API Documentation
  - CREATE
    - CREATE restaurant record by id: '/restaurant/add/:name/:area/:menuitemlovedfor'
  - READ
    - READ restaurant reviews by id: '/restaurant/:id/reviews'
    - READ restaurant filter keywords by id: '/restaurant/:id/filterKeywords'
    - READ restaurant "LovedFor" by id: '/restaurant/:id/LovedFor'
    - READ restaurant info by id: '/restaurant/:id/info'
  - UPDATE
    - UPDATE restaurant helpfulness score: '/restaurant/:is_helpful/id/:id/helpfulEvent'
  - DELETE
    - DELETE restaurant by id: '/restaurant/remove/:id'
