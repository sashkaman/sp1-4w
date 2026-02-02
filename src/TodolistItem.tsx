import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import type { FilterValues, Task } from './App'
import { Button } from './Button'

type Props = {
  title: string
  tasks: Task[]
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterValues) => void
  createTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter?: FilterValues
}

export const TodolistItem = ({ title,
  tasks,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
  filter }: Props) => {

  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim()
    if (trimmedTitle !== '') {
      createTask(trimmedTitle)
      setTaskTitle('')
    } else {
      setError('Title is required')
    }
  }

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
    setError(null)
  }

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()
    }
  }

  return (
    <div>
      <h3>{title}</h3>

      <div>
        <input className={error ? 'error' : ''}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler} />
        <Button title={'+'} onClick={createTaskHandler} disabled={!taskTitle || taskTitle.length > 10} />
        {error && <div className={'error-message'}>{error}</div>}
      </div>

      {/* {!taskTitle && <div>Max title lenght is 10 charters</div>}
      {taskTitle.length > 10 && <div style={{ color: 'red' }}>Max title lenght is 10 charters</div>}
      {taskTitle && taskTitle.length <= 9 && <div>Your title lenght is {taskTitle.length} charters</div>} */}

      {/* {taskTitle.length > 10 && <div style={{ color: 'red' }}>Max title lenght is 10 charters</div>} */}

      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(task.id)
            }

            return (
              <li key={task.id} className={task.isDone ? 'is-Done' : ''}>
                <input type="checkbox"
                  checked={task.isDone}
                  onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
                />
                <span>{task.title}</span>
                <Button title={'x'} onClick={deleteTaskHandler} />
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button className={filter === 'all' ? 'active-filter' : ''}
          title={'All'}
          onClick={() => changeFilter('all')} />
        <Button className={filter === 'active' ? 'active-filter' : ''}
          title={'Active'}
          onClick={() => changeFilter('active')} />
        <Button className={filter === 'completed' ? 'active-filter' : ''}
          title={'Completed'}
          onClick={() => changeFilter('completed')} />
      </div>
    </div>
  )
}
