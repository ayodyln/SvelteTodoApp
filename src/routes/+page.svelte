<script>
	import Todos from '$lib/components/Todos.svelte'
	import { fetchTodos } from '$lib/todo.js'
	import { onMount } from 'svelte'

	import Form from '../lib/components/Form.svelte'

	let todos = []

	const updateListHandler = (Todos) => (todos = [...Todos])

	onMount(() => {
		setTimeout(async () => {
			todos = await fetchTodos()
		}, 500)
	})
</script>

<main class="max-w-2xl m-auto py-2">
	<h1 class="text-4xl font-bold mb-2">Svelte Todo App</h1>

	<div class="flex gap-1 h-full w-full">
		<section class="w-1/2">
			<Form {updateListHandler} />
		</section>

		<div class="divider divider-horizontal m-0 h-50" />

		<section class="w-1/2 ">
			{#if !todos}
				<p>loading...</p>
			{:else}
				<ul class="flex gap-2 flex-col">
					{#each todos as todo}
						<Todos {todo} />
					{/each}
				</ul>
			{/if}
		</section>
	</div>
</main>

<!--
User can edit todos
User can complete todos
User can delete todos 
-->
