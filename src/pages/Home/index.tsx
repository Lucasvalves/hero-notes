import styles from './Home.module.css'
import Header from '../../components/Header'
  import {List} from '../../components/List'
import { useState, ChangeEvent, useEffect } from 'react'
import { v4 as uuid} from 'uuid';

export interface ITodo{
  id: string;
  description: string;
  completed: boolean;
}
export function Home(){
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [totalInProgress, setTotalInProgress] = useState(0);
  const [totalInComplete, setTotalInComplete] = useState(0);

  useEffect(() => {
    const newtotalInProgress = todos.reduce(
      (previusValue, current) => 
      !current.completed ? previusValue+1 : previusValue,
      0,
    );
    const newtotalInCompleted = todos.reduce(
      (previusValue, current) => 
      current.completed ? previusValue+1 : previusValue,
      0,
    );
    setTotalInProgress(newtotalInProgress);
    setTotalInComplete(newtotalInCompleted);
    
  }, [todos]);
  

  const addTodo = () => {
    const newTodo = {
      id: uuid(),
      description: todo,
      completed: false
    };
    setTodos([...todos,newTodo]);
    setTodo('');
  };

  const deleteTodo = (id:string) =>{
    const filterTodos = todos.filter(todo=>todo.id !==id);

    setTodos(filterTodos);
  };
  const completeTodo = (id:string) =>{
    const newTodosState = todos.map((todo) =>{
      if(todo.id === id ){
        return {...todo, completed: ! todo.completed}
      }else{
        return todo;
      }
    });
    setTodos(newTodosState);
  };
  const editTodo = (event: ChangeEvent<HTMLInputElement>, id:string) =>{
    const newTodosState = todos.map((todo)=>{
      if(todo.id === id){
        return {
          ...todo,
          description: event.target.value
          };
      }
      return todo;
    })
    setTodos(newTodosState);
  };
  return (
    <div>
      <Header />
      <div className={styles.creatTask}>
        <input type='text' placeholder='Insira a tarefa' value={todo} onChange={(e)=>setTodo(e.target.value)}/>
        <button onClick={addTodo}>Adiconar</button>
      </div>
      <div className={styles.filter}>
        <span className={styles.finish}>Finalizados: {totalInComplete}</span>
        <span className={styles.progress}>Em progesso: {totalInProgress}</span>
      </div>
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} editTodo={editTodo}/>
    </div>
  )
}