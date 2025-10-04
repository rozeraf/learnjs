interface Todo {
  id: number;
  text: string;
  completed: boolean;
  description: string;
}
const todos: Todo[] = [];
let nextId = 1;
while (true) {
  const command = prompt('Enter command ( add | list | toggle | exit ): ');
  switch (command) {
    case 'add':
      const usertask = prompt('Enter new task text: ');
      if (!usertask) {
        console.log('You cannot add empty task');
        break;
      }
      const userdesc = prompt('Enter a task description: ');
      if (!userdesc) {
        console.log('You cannot add and empty description');
        break;
      }
      const task: Todo = {
        id: nextId,
        text: usertask,
        completed: false,
        description: userdesc,
      };
      todos.push(task);
      nextId++;
      break;
    case 'list':
      todos.forEach((todo) => {
        const status = todo.completed ? '[x]' : '[ ]';
        console.log(`${status} ${todo.id} ${todo.text} ${todo.description}`);
      });
      break;
    case 'toggle':
      const userId = Number(prompt('Enter task number: '));
      if (isNaN(userId)) {
        console.log('Input is NaN');
        process.exit(1);
      }
      const todo = todos.find((t) => t.id === userId);
      if (todo) {
        todo.completed = !todo.completed;
        console.log(`Status changed to ${todo.completed}`);
      } else {
        console.log('Unknown task id');
      }
      break;
    case 'exit':
      console.log('bye');
      process.exit(0);
      break;
    default:
      console.log('unknown command');
      break;
  }
}
