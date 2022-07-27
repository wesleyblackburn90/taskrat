import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { editTaskThunk } from '../../../store/tasks'
import BookingForm from '../../Bookings/BookingForm'

function TaskCard({ task }) {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const [available, setAvailable] = useState(task.available)
  console.log(task.available)

  let user
  if (users) {
    user = users.filter(user => user.id === task.poster_id)[0]
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/users/')
      const resData = await res.json()
      setUsers(resData.users)
    }
    fetchData()
  }, [])

  const updateAvailability = () => setAvailable(!task.available)

  // const handleClaimTask = async (e) => {
  //   e.preventDefault()

  //   const payload = {
  //     ...task,
  //     available: false
  //   }
  //   console.log(payload)
  //   try {
  //     await dispatch(editTaskThunk(payload))
  //   } catch (e) {
  //     return 'not updating'
  //   }
  // }

  return (
    <>
      {user && task ?
        <div>
          <NavLink to={`/tasks/${task.id}`} task={task}>
            <h3> {task.title} </h3>
            <p>User: {user.first_name} {user.last_name}</p>
            <p>Location: {task.city}, {task.state}, {task.country}</p>
            <p>Danger Level: {task.danger_level}</p>
            <p>Reward: {task.price} BOTTLE CAPS</p>
            {task.tags.map(tag => (
                    <div key={tag.type} style={{'border': '1px solid red', 'maxWidth': '100px'}}>
                        {tag.type}
                    </div>
                ))}
          </NavLink>
          <BookingForm task={task}/>
        </div>
        :
        null
      }
    </>
  )
}

export default TaskCard
