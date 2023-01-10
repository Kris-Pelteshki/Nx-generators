import { TodoClient } from '@nx-repo/todo/data-access';
import { ITodo } from '@nx-repo/todo/domain';
import { CreateTodo, Todos } from '@nx-repo/todo/ui';
import { useCallback, useEffect, useState } from 'react';

export function Index() {
  const client = new TodoClient();
  const [todos, setTodos] = useState<ITodo[]>([]);

  const fetchTodos = async () => {
    try {
      const res = await client.getMany();
      setTodos(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTodo = useCallback(
    async (title: string) => {
      try {
        const res = await client.create({
          title,
          userId: '4f6b6cf2-591b-4477-a58b-17adfdc01c83',
        });

        setTodos((prev) => [...prev, res.data]);
      } catch (error) {
        console.error(error);
      }
    },
    [client]
  );

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <h3>Todos</h3>
          <CreateTodo onCreate={createTodo} />
          <Todos todos={todos} />
        </div>
      </div>
    </div>
  );
}

export default Index;
