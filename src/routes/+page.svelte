<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<main>
  <h1>Welcome to Chat-App</h1>
  <p>This is a simple real-time messaging app built with SvelteKit and PocketBase.</p>
  <button on:click={() => goto('/login')}>Login</button>
  <button on:click={() => goto('/register')}>Register</button>
</main>

<style>
  main {
    text-align: center;
    margin-top: 6rem;
  }
  button {
    margin: 1rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
</style>