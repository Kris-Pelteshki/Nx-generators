import { ITodo } from '@nx-repo/todo/domain';
import React from 'react';
import styles from './todo-ui.module.scss';

interface TodoUiProps {
  todo: ITodo;
  index?: number;
}

export function TodoUi({ todo, index }: TodoUiProps) {
  const { title, id, done, updatedAt } = todo;

  return (
    <div
      className={styles['container']}
      style={{ '--fade-delay': `${250 * index}ms` }}
    >
      <span>{title}</span>
    </div>
  );
}

export default TodoUi;
