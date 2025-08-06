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

<div class="auth-container">
  <form on:submit|preventDefault={handleLogin}>
    <h2 class="page-title">Login</h2>
    {#if error}<p class="error">{error}</p>{/if}
    <input type="email" bind:value={email} placeholder="Email" required />
    <input type="password" bind:value={password} placeholder="Password" required />
    <button class="btn" type="submit">Login</button>
  </form>
</div>

<style>
  .auth-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    height: 100dvh;
    padding: 1rem;
  }

  form {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
  }

  input {
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  .error {
    color: red;
    text-align: center;
  }

  @media (max-width: 600px) {
    form {
      padding: 1rem;
      gap: 0.75rem;
    }

    input,
    button {
      font-size: 1rem;
      padding: 0.75rem;
    }
  }
</style>

