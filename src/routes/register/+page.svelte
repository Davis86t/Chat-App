<script lang="ts">
  import { register } from '$lib/pocketbase';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';

  async function handleRegister() {
    try {
      await register(email, password);
      goto('/chat');
    } catch (err) {
      error = err.message || 'Registration failed';
    }
  }
</script>

<form on:submit|preventDefault={handleRegister}>
  <h2>Register</h2>
  {#if error}<p class="error">{error}</p>{/if}
  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <button type="submit">Register</button>
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