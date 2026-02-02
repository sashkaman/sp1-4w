import './App.css'
import { useState } from 'react'
import { v1 } from 'uuid'
import { TodolistItem } from './TodolistItem'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

// create +
// read + (filter, sort, pagination)
// update + 
// delete +

// CRUD => CLI, GUI, VUI

export const App = () => {
  // console.log(typeof v1())
  const [filter, setFilter] = useState<FilterValues>('all')

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ])

  const createTask = (title: string) => {
    const newTask = { id: v1(), title, isDone: false }
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  let filteredTasks = tasks
  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.isDone)
  }

  const deleteTask = (taskId: string) => {
    const filteredTasks = tasks.filter(task => {
      return task.id !== taskId
    })
    setTasks(filteredTasks)
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const newTasks = tasks.map(t =>
      t.id === taskId ? { ...t, isDone } : t
    )
    setTasks(newTasks)
  }

  // const changeTaskStatus = (taskId: string, isDone: boolean) => {
  //   const task = tasks.find(t => t.id === taskId)
  //   if (task) {
  //     task.isDone = isDone
  //     setTasks([...tasks])
  //   }
  // }

  return (
    <div className="app">
      <TodolistItem title="What to learn"
        tasks={filteredTasks}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
      />
    </div>
  )
}
