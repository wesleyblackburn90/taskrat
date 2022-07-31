import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsThunk } from '../../store/review';
import SingleReview from '../Reviews/SingleReview';
import './profilereviews.css';

function ProfileReviews({ reviewArr, user, reviewsAboutMeArr, selectedButton }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getReviewsThunk())
  }, [dispatch])

  return (
    <>
      <div style={{ display: selectedButton.includes(2) ? 'grid' : 'none' }}>
        <div className='title-profile'>
          {sessionUser && !user && <h2 className='profile-reviews-h2'>Here are your reviews</h2>}
        </div>
        <div className='review-scroll'>
          <div className='review-container'>
            {sessionUser && !user && reviewArr.length > 0 && reviewArr.map(review => {
              return (
                <SingleReview key={review.id} review={review} />
              )
            })}
          </div>
        </div>
      </div>
      <div style={{ display: selectedButton.includes(4) ? 'grid' : 'none' }}>
        <div className='title-profile'>
          <h2 className='profile-reviews-h2'>Reputation</h2>
        </div>
        <div className='review-scroll'>
          <div className='review-container'>
            {reviewsAboutMeArr && reviewsAboutMeArr.length > 0 && reviewsAboutMeArr.map(review => {
              return (
                <SingleReview key={review.id} review={review} />
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileReviews;
