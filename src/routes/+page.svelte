<script lang="ts">
  import { goto } from '$app/navigation';

  function goToLogin() {
    goto('/login');
  }

  function goToRegister() {
    goto('/register');
  }
</script>

<main class="landing">
  <div class="content">
    <h1>Welcome to Chat-App</h1>
    <p>This is a simple real-time messaging app built with SvelteKit and PocketBase.</p>
    <div class="buttons">
      <button on:click={goToLogin}>Login</button>
      <button on:click={goToRegister}>Register</button>
    </div>
  </div>
</main>

<style>
  .landing {
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
    background: #f8f8f8;
  }

  .content {
    max-width: 500px;
    width: 100%;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  h1 {
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  p {
    margin-bottom: 2rem;
    color: #555;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  button {
    padding: 0.75rem;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    background-color: #0070f3;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: #005dc1;
  }

  @media (min-width: 600px) {
    .buttons {
      flex-direction: row;
      justify-content: center;
    }

    button {
      width: 150px;
    }
  }
</style>
