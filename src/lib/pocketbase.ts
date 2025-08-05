import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase(import.meta.env.DEV
  ? 'http://localhost:8090'
  : 'https://chat-app-backend-r1km.onrender.com'
);

export const currentUser = writable(pb.authStore.model);

// Sync store and log auth changes
pb.authStore.onChange(() => {
  currentUser.set(pb.authStore.model);
  console.log('Auth changed:', pb.authStore.model);
});

export async function login(email: string, password: string) {
  await pb.collection('users').authWithPassword(email, password);
  currentUser.set(pb.authStore.model);
}

export async function register(email: string, password: string) {
  const username = email.split('@')[0];
  await pb.collection('users').create({
    email,
    password,
    passwordConfirm: password,
    username,
    emailVisibility: true
  });
  await login(email, password);
}

export function logout() {
  pb.authStore.clear();
  currentUser.set(null);
}
