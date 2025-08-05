<script lang="ts">
  import { goto } from '$app/navigation';

  function goToLogin() {
    goto('/login');
  }

  function goToRegister() {
    goto('/register');
  }
</script>

<main>
  <h1>Welcome to Chat-App</h1>
  <p>This is a simple real-time messaging app built with SvelteKit and PocketBase.</p>
  <button on:click={goToLogin}>Login</button>
  <button on:click={goToRegister}>Register</button>
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