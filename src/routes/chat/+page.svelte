<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { pb, currentUser, logout } from '$lib/pocketbase';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';

  let messages: any[] = [];
  let newMessage = '';
  let unsubscribe: () => void;
  let error = '';

  onMount(async () => {
    try {
      const res = await pb.collection('messages').getList(1, 50, {
        sort: 'created',
        expand: 'sender'
      });
      messages = res.items;

      unsubscribe = await pb.collection('messages').subscribe('*', async ({ action, record }) => {
        if (action === 'create') {
          const sender = await pb.collection('users').getOne(record.sender);
          record.expand = { sender };
          messages = [...messages, record];
        }
      });
    } catch (err) {
      error = err.message || 'Failed to load messages';
    }
  });

  onDestroy(() => unsubscribe?.());

  async function sendMessage() {
    if (!newMessage) return;
    try {
      await pb.collection('messages').create({
        text: newMessage,
        sender: get(currentUser).id
      });
      newMessage = '';
    } catch (err) {
      error = err.message || 'Failed to send message';
    }
  }

  function handleLogout() {
    logout();
    goto('/login');
  }
</script>

{#if error}<p class="error">{error}</p>{/if}
<div class="chat">
  <header>
    <h2>Chat</h2>
    <button on:click={handleLogout}>Logout</button>
  </header>
  <div class="messages">
    {#each messages as m (m.id)}
      <div class="msg">
        <small>{m.expand?.sender?.username ?? m.sender}</small>
        <p>{m.text}</p>
      </div>
    {/each}
  </div>
  <form on:submit|preventDefault={sendMessage}>
    <input bind:value={newMessage} placeholder="Type a message..." />
    <button type="submit">Send</button>
  </form>
</div>

<style>
  .chat {
    max-width: 700px;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .messages {
    flex: 1;
    border: 1px solid #ccc;
    padding: 1rem;
    height: 300px;
    overflow-y: auto;
    background: #fafafa;
  }
  .msg { margin-bottom: 1rem; }
  .msg small { color: #555; display: block; margin-bottom: 0.2rem; }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  form {
    display: flex;
    gap: 0.5rem;
  }
  input {
    flex: 1;
    padding: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
  }
  .error { color: red; text-align: center; }
</style>
