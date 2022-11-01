import { FormEvent } from 'react';
import styles from './create-todo.module.scss';

export interface CreateTodoProps {
  onCreate(title: string): void;
}

export function CreateTodo({ onCreate }: CreateTodoProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get('todoName')?.toString();

    if (title) {
      onCreate(title);
    }
  };

  return (
    <div className={styles['container']}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="create-todo">
          <div>Create a new Todo</div>
          <input
            id="create-todo"
            name="todoName"
            type="text"
            className={styles['input']}
          />
        </label>
        <button className={styles['btn']} type="submit">
          create
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
