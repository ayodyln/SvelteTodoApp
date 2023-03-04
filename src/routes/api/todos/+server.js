const Todos = [
	{
		id: 1,
		task: 'Homework',
		ts: 1677883448390,
		completed: false
	},
	{
		id: 2,
		task: 'Chores',
		ts: 1677883449000,
		completed: true
	}
]

export const GET = async () => {
	return new Response(JSON.stringify({ Todos }), {
		headers: {
			'content-type': 'application/json'
		}
	})
}

export const POST = async ({ request }) => {
	const data = await request.json()

	Todos.push({
		...data,
		completed: false,
		id: Todos.length + 1
	})

	return new Response(JSON.stringify({ Todos }), {
		headers: {
			'content-type': 'application/json'
		}
	})
}

export const PUT = async ({ request }) => {
	const data = await request.json()

	const todo = Todos.find((todo) => todo.id === data.id)
	todo.task = data.task
	todo.ts = data.ts

	return new Response(JSON.stringify({ Todos }), {
		headers: {
			'content-type': 'application/json'
		}
	})
}
