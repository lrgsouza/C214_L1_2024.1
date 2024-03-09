/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToDoList } from './TodoList'

const anyTask = {
  title: 'any_title',
  description: 'any_description',
  targetDate: '01/01/2025',
  type: 'any_type',
  priority: '1',
  subTasks: []
}

//updatedTask
const updatedTask = {
  title: 'Updated title',
  description: 'Updated description',
  targetDate: '01/01/2025',
  type: 'Updated type',
  priority: '1',
  subTasks: []
}

describe('ToDoList', () => {
  describe('Testing ToDoList', () => {
    test('should add a new task to the list', () => {
      const todoList = new ToDoList()
      todoList.add(anyTask)
      const tasks = todoList.getTasks()
      expect(tasks).toEqual([anyTask])
    })

    test('should add a valid tasks', () => {
      const todoList = new ToDoList()
      const invalidTask: any = {
        invalidField: 'invalidValue'
      }
      todoList.add(invalidTask)
      const tasks = todoList.getTasks()
      expect(tasks).toEqual([])
    })

    // Test for updateTask method
    test('should updateTask updates the task at the specified index', () => {
      const todoList = new ToDoList();
      // Add some task
      todoList.add(anyTask)
      todoList.updateTask(0, updatedTask);
      expect(todoList.getTasks()[0]).toEqual(updatedTask);
    });

    // Test for removeTask method
    test('should removeTask removes the task at the specified index', () => {
      const todoList = new ToDoList();
      todoList.add(anyTask)
      //remove task at index 0
      todoList.removeTask(0);
      expect(todoList.getTasks()).toEqual([]);
    });

  })
})