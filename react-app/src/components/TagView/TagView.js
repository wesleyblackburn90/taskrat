import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import TaskCard from '../Tasks/taskCard/taskCard'
import { getTasksThunk } from '../../store/tasks'

function TagView() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const allTasks = useSelector((state) => state.tasks)

    const [tags, setTags] = useState('')

    useEffect(() => {
        const fetchTags = async () => {
            const res = await fetch('/api/tasks/tags')
            const data = await res.json()
            setTags(data.tags)
        }
        fetchTags()
    }, [])

    useEffect(() => {
        const fetchTasks = async () => {
          await dispatch(getTasksThunk())
        }
        fetchTasks().catch(console.error)
    }, [dispatch])

    let pageTag
    if (tags) {
        pageTag = Object.values(tags).filter(tag => tag.id === Number(id))[0]
    }

    let taggedTasks = []
    if (allTasks && pageTag) {
        const tasksArr = Object.values(allTasks)
        for (let task of tasksArr) {
            const tags = Object.values(task.tags)
            for (let tag of tags) {
                const tagArr = Object.values(tag)
                if (tagArr.includes(pageTag.id)) {
                    taggedTasks.push(task)
                }
            }
        }
    }

    let src
    if (pageTag) {
        console.log(pageTag.id)
        switch (pageTag.id) {
            case 1:
                src = 'https://staticdelivery.nexusmods.com/images/130/190461-1561218598.png'
                break
            case 2:
                src = 'https://images5.alphacoders.com/665/thumb-1920-665815.jpg'
                break
            case 3:
                src = 'https://c.wallhere.com/photos/ce/70/video_games_Fallout_Fallout_New_Vegas-249137.jpg!d'
                break
            case 4:
                src = 'https://c.wallhere.com/photos/5f/e7/1920x1080_px_Fallout_Fallout_New_Vegas_Ulysses_Fallout-834045.jpg!d'
                break
            case 5:
                src = 'https://i.pinimg.com/564x/45/9c/a0/459ca0969dbac996bbfc142f62fd4a6e.jpg'
                break
            case 6:
                src = 'https://staticdelivery.nexusmods.com/images/130/190461-1561218598.png'
                break
            case 7:
                src = 'https://s1.gaming-cdn.com/images/products/4167/screenshot/fallout-new-vegas-honest-hearts-pc-game-steam-wallpaper-1-big.jpg'
                break
            case 8:
                src = 'https://cdna.artstation.com/p/assets/images/images/038/600/848/large/matthew-marquis-fallout4-wrwe7ryown.jpg'
                break
                case 9:
                src = 'https://c.wallhere.com/photos/3f/17/mojave_fallout_enb_newvegas_sweetfx-859195.jpg!d'
                break
        }
    }

    const availableTasks = taggedTasks.filter(task => task.available === true)

    return (
        pageTag ?
        <div>
            <div className="header-wrapper">
                <div className='header-img'>
                    <img src={src} alt='tag-view'/>
                </div>
                <div className="header-info-card">
                    <div className="header-text-container">
                        <h1>{pageTag.type}!</h1>
                        <div className="line-break"></div>
                    </div>
                        <p>{pageTag.description}</p>
                </div>
            </div>
            <div className='tasks-wrapper'>
                <p className='sub-text'>Get out there and be somebody.</p>
                <div className='card-container'>
                    {availableTasks.map(task => (
                        <div key={task.id}>
                                <TaskCard task={task} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
        :
        <div>...loading</div>
    )
}

export default TagView
