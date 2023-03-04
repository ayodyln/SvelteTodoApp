<script>
	import Completed from './Completed.svelte'
	import NotComplete from './NotComplete.svelte'

	export let todo

	let editState = false,
		newTask,
		newDate

	const dueDate = (ts) => {
		const date = new Date(ts)
		return `${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}-${
			date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()
		}-${date.getFullYear()}`
	}

	const editTodo = () => (editState = !editState)

	const updateTodoHandler = async (event) => {
		if (!newTask || !newDate) {
			editState = !editState
			return
		}
		const id = event.target.dataset.id * 1

		try {
			const UpdateTodo = await fetch('/api/todos', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id,
					task,
					ts: new Date(date).getTime()
				})
			})
		} catch (error) {}
	}
</script>

<li class="rounded-lg h-24 flex gap-1 justify-between bg-accent text-accent-content p-2">
	<div class="w-2/3">
		{#if !editState}
			<h3 class="text-xl font-bold">{todo.task}</h3>
			<p>{dueDate(todo.ts)}</p>
		{:else}
			<div class="form-control mb-1">
				<input
					type="text"
					placeholder="Name of Task..."
					class="input input-sm input-bordered w-full"
					bind:value={newTask} />
			</div>

			<div class="form-control">
				<input
					type="date"
					class="input text-primary-content input-sm input-bordered w-full"
					bind:value={newDate} />
			</div>
		{/if}
	</div>

	<div class="flex flex-wrap w-1/3">
		<button
			class="btn {editState ? 'btn-disabled' : ''} rounded-r-none fill-white w-1/2 tooltip"
			data-tip="Complete Todo">
			{#if todo.completed}
				<Completed />
			{:else}
				<NotComplete />
			{/if}
		</button>

		<button
			data-id={todo.id}
			class="btn rounded-l-none fill-white w-1/2 tooltip"
			data-tip="edit todo"
			on:click={editTodo}>
			{#if !editState}
				<svg xmlns="http://www.w3.org/2000/svg" class="w-3" viewBox="0 0 512 512"
					><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
			{:else}
				X
			{/if}
		</button>

		{#if editState}
			<button data-id={todo.id} on:click={updateTodoHandler} class="btn w-full btn-sm mt-1"
				>Save</button>
		{/if}
	</div>
</li>
