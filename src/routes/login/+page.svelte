<script lang="ts">
  import { login } from '$lib/pocketbase';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';

  async function handleLogin() {
    try {
      await login(email, password);
      goto('/chat');
    } catch (err) {
      error = err.message || 'Login failed';
    }
  }
</script>

<form on:submit|preventDefault={handleLogin}>
  <h2>Login</h2>
  {#if error}<p class="error">{error}</p>{/if}
  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <button type="submit">Login</button>
</form>

<style>
  form {
    max-width: 400px;
    margin: 4rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .error { color: red; text-align: center; }
</style>
