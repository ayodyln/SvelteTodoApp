<script>
	export let updateListHandler

	let task, date

	const createTodoHandler = async () => {
		if (!task || !date) return

		try {
			const Todo = await fetch('/api/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					task,
					ts: new Date(date).getTime()
				})
			})

			const list = await Todo.json()

			updateListHandler(list.Todos)
		} catch (error) {
			console.log(error)
		}

		task = undefined
		date = undefined
	}
</script>

<form class="w-full h-fit flex flex-col gap-2 bg-neutral text-neutral-content p-1 rounded-lg">
	<h2 class="text-xl">Create To Do</h2>

	<div class="form-control">
		<label class="input-group">
			<span class="bg-accent">Todo</span>
			<input
				type="text"
				placeholder="To Do Task..."
				class="input input-bordered text-primary-content"
				bind:value={task} />
		</label>
	</div>

	<div class="form-control">
		<label class="input-group">
			<span class="bg-accent">Date</span>
			<input type="date" class="input input-bordered text-primary-content" bind:value={date} />
		</label>
	</div>

	<button class="mt-2 btn btn-accent w-1/2 self-end" on:click={createTodoHandler}>Create</button>
</form>
