import { ITodo } from '@nx-repo/todo/domain';
import styles from './todo-ui.module.scss';

interface TodoUiProps {
  todo: ITodo;
}

export function TodoUi({ todo }: TodoUiProps) {
  const { title, id, done, updatedAt } = todo;

  return (
    <div className={styles['container']}>
      <span>{title}</span>
    </div>
  );
}

export default TodoUi;
