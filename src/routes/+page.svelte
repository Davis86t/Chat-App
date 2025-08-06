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
    <h1 class="page-title">Welcome to Chat-App</h1>
    <p class="accent-title">This is a simple real-time messaging app built with SvelteKit and PocketBase.</p>
    <div class="buttons">
      <button on:click={goToLogin}>Login</button>
      <button on:click={goToRegister} class="ghost">Register</button>
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

  .accent-title {
   font-family: var(--font-body);
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 600px) {
    .buttons {
      flex-direction: row;
      justify-content: center;
    }
  }
</style>
