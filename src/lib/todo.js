export const fetchTodos = async () => {
	try {
		const todos = await fetch('/api/todos');
		const res = await todos.json();
		return res.Todos;
	} catch (error) {
		console.log(error);
	}
};
