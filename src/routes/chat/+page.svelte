<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { pb, currentUser, logout } from '$lib/pocketbase';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import { tick } from 'svelte';

  let messages: any[] = [];
  let newMessage = '';
  let unsubscribe: () => void;
  let error = '';
  let messagesContainer: HTMLDivElement | null = null;



  onMount(async () => {
    try {
      const res = await pb.collection('messages').getList(1, 50, {
        sort: 'created',
        expand: 'sender'
      });
      messages = res.items;
      scrollToBottom();

      unsubscribe = await pb.collection('messages').subscribe('*', async ({ action, record }) => {
        if (action === 'create') {
          const sender = await pb.collection('users').getOne(record.sender);
          record.expand = { sender };
          messages = [...messages, record];
          await tick(); // Wait for DOM to update
          scrollToBottom();
        }
      });
    } catch (err) {
      error = err.message || 'Failed to load messages';
      console.error('Subscription error:', err);
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
      await tick(); // Wait for DOM to update
      scrollToBottom()
    } catch (err) {
      error = err.message || 'Failed to send message';
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      messagesContainer?.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });
    }, 0);
  }

  function handleLogout() {
    logout();
    goto('/');
  }
</script>

{#if error}<p class="error">{error}</p>{/if}
<div class="chat">
  <header>
    <h2 class="page-title">Chat</h2>
  </header>
  <div class="messages" bind:this={messagesContainer}>
    {#each messages as m (m.id)}
      <div class="msg {m.sender === get(currentUser).id ? 'self' : 'other'}">
        <div class="meta">
          <small>{m.expand?.sender?.username || m.expand?.sender?.email || m.sender}
            &middot; 
            <div class="timestamp">{new Date(m.created).toLocaleString('en-US', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: '2-digit'
            })}
            </div>
          </small>
        </div>
        <p>{m.text}</p>
      </div>
    {/each}
  </div>
  <form on:submit|preventDefault={sendMessage}>
    <input bind:value={newMessage} placeholder="Type a message..." />
    <button type="submit">Send</button>
  </form>
  <footer>
    <button on:click={handleLogout} class="ghost">Logout</button>
  </footer>
</div>

<style>
  @media (max-width: 600px) {
    .chat {
      margin: 0;
      padding-inline: 0.5rem;
      height: calc(var(--vh, 1vh) * 100);
      max-height: calc(var(--vh, 1vh) * 100);
    }

    .messages {
      padding: 0.5rem;
      flex:1;
      overflow-y: auto;
    }

    input,
    button {
      font-size: 1rem;
      padding: 0.5rem;
    }

    form {
      flex-direction: column;
      gap: 0.5rem;
    }

    footer {
      padding: 0.5rem 0;
    }
  }

  .chat {
    display: flex;
    flex-direction: column;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 1rem;
    height: calc(var(--vh, 1vh) * 100);
    max-height: calc(var(--vh, 1vh) * 100);
    box-sizing: border-box;
    border-radius: 12px;
    overflow: hidden; 
  }

  .messages {
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 1px solid #ccc;
    padding: 1rem;
    background: #fafafa;
    overflow-y: auto;
    min-height: 0;
    border-radius: 8px;
  }

  .msg {
    display:flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    max-width: 70%;
  }

  .msg small { 
    color: #555;
    display: block;
    margin-bottom: 0.2rem; 
  }

  .self {
  background-color: #daf1da;
  align-self: flex-end;
  text-align: right;
  }

  .other {
  background-color: #f0f0f0;
  align-self: flex-start;
  text-align: left;
  }

  .meta {
  font-size: 0.75rem;
  color: #555;
  margin-bottom: 0.2rem;
  display: flex;
  justify-content: space-between;
  }

  .timestamp {
  font-style: italic;
  }

  header {
    padding: 1rem 0;
    flex: 0 0 auto;
  }

  footer {
  padding: 1rem 0;
  justify-content: center;
  display: flex;
  border-top: 1px solid #eee;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  }

  form {
    position: sticky;
    bottom: 0;
    background: #fff;
    z-index: 1;
    display: flex;
    gap: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: env(safe-area-inset-bottom);
  }

  input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  .error { color: red; text-align: center; }
</style>
