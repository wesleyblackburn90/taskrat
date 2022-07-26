import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editReviewThunk } from '../../store/review';

function EditReviewForm({toggleShow, reviewProp}) {
console.log("review prop ==> ", reviewProp)
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const taskId = 1;
  // const task = useSelector(state => state.tasks[taskId])

  // const [validationErrors, setValidationErrors]
  const [rating, setRating] = useState(reviewProp.rating);
  const [comment, setComment] = useState(reviewProp.comment);


  const handleCancel = (e) => {
    e.preventDefault();
    setRating(1);
    setComment('');
    toggleShow()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: reviewProp.id,
      rating,
      comment,
      tasker_id: sessionUser.id,
      task_id: taskId
    }

    const newReview = await dispatch(editReviewThunk(data));

    if (newReview) {
      setRating(1);
      setComment('');
      toggleShow()
      window.alert('WOOO!')
    }
  }

  return (
    <>
      <h1>Edit Review</h1>
      <form onSubmit={handleSubmit}>
        <label>Rating</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <div>
          <label>Comment</label>
          <input
            value={comment}
            type='text'
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>Submit</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default EditReviewForm;
