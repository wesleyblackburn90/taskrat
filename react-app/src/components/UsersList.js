import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UsersProfileModal from './Profile/UsersProfileModal';

function UsersList() {
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector(state => state.session)
  let availableUsers = [...users];
  if(sessionUser.user) {
    availableUsers = availableUsers.filter(user => user.id !== sessionUser.user.id)
  }
  while (availableUsers.length > 3) {
    availableUsers.pop()
  }

  console.log(availableUsers)
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);


  const userComponents = availableUsers.map((user) => {
    return (
      <div className='card users' id={user.id}> 
        <div className='user-id'>
          <div className='user-img'>
            <img src={user.pic_url} alt="cool guy" className="user-card-img"/>
          </div>
          <div className='user-name'>
            <p>{user.first_name} {user.last_name}</p>
            <p>Located in {user.city}, {user.state}, {user.country}</p>
          </div>
        </div>
        <div className='content-container'>
          {user.bio ? 
          <p>About me :</p>
          : null}
          <p className='bio'>{user.bio}</p>
        </div>
        <div className='home-page-buttons'>
            <UsersProfileModal user={user} />
        </div>
      </div>
    );
  });

  return (
    <>
      <div className='home-page-title'>
        <h2>Featured users</h2>
      </div>
      <div className="card-container">
        {userComponents}
      </div>
    </>
  );
}

export default UsersList;
