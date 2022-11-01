import { ITodo } from '@nx-repo/todo/domain';
import TodoUi from '../todo/todo-ui';
import styles from './todos.module.scss';

export interface TodosProps {
  todos: ITodo[];
}

export function Todos({ todos }: TodosProps) {
  return (
    <div className={styles['container']}>
      {todos.map((todo) => (
        <TodoUi todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

export default Todos;
