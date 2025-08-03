import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase('http://localhost:8090');
export const currentUser = writable(pb.authStore.model);

// Sync store with PocketBase
type AuthModel = typeof pb.authStore.model;

pb.authStore.onChange(() => {
  currentUser.set(pb.authStore.model);
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
