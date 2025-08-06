# 💬 Chat-App

A modern, responsive real-time chat application built with **SvelteKit** and **PocketBase**.

This project was completed as part of a full-stack coding challenge to demonstrate experience in frontend and backend development, UI/UX polish, and deployment. It is designed to be intuitive, fast, and mobile-friendly.

---

## 🌐 Live Demo

**Frontend:** [https://tannerdavis.dev](https://tannerdavis.dev)  
**Backend (PocketBase):** [https://chat-app-backend-r1km.onrender.com](https://chat-app-backend-r1km.onrender.com)

→ You can register, log in, and chat in real time with others.

---

## 🛠️ Tech Stack

- **Frontend:** [SvelteKit](https://kit.svelte.dev/)
- **Backend:** [PocketBase](https://pocketbase.io/) (Self-hosted BaaS)
- **Deployment:** Vercel (Frontend) + Render (PocketBase API)
- **Styling:** Responsive mobile-first CSS with modern layout techniques
- **Auth:** PocketBase users collection with secure login and registration

---

## 🚀 Getting Started Locally

### Clone the project:

```bash
git clone https://github.com/davis86t/chat-app.git
cd chat-app
npm install
npm run dev
```

> You'll need PocketBase running locally too:

```bash
./pocketbase serve
```

Make sure your frontend is configured to connect to the correct PocketBase instance (update the API URL in `src/lib/pocketbase.ts`).

---

## ✨ Features

- ✅ User registration and login  
- ✅ Real-time messaging with PocketBase subscriptions  
- ✅ User authentication with token storage  
- ✅ Auto-scroll to latest messages  
- ✅ Clean UI and polished UX  
- ✅ Fully responsive for mobile and desktop  
- ✅ Logout functionality  
- ✅ Custom button components with hover and theme-aware styling  
- ✅ Smooth animations and scroll behavior  
- ✅ Message timestamps with consistent formatting  
- ✅ Custom fonts and accessible color contrast  

---

## 🎯 Extra Credit

- 🧠 Username support (not just email)  
- 🎨 Styled button variants (default, outline, ghost, etc.)  
- 🖼️ Mobile layout with 100dvh and dynamic keyboard-aware scroll behavior  
- 🧪 Dev + production environment handling  
- 🧱 CSS modular structure for maintainability  

---

## 🤔 Development Notes

This app was built using the latest SvelteKit and PocketBase. The chat updates in real time using PocketBase's `subscribe()` feature. Messages are stored with an expanded `sender` reference, allowing us to show the user's `username` instead of a raw ID. Input forms and the layout are carefully crafted to support both desktop and mobile experiences. A custom auto-scroll method was implemented using `bind:this` and `tick()` to wait for DOM rendering.

---

## 🧪 TODO / Stretch Goals

- ✅ Auto-login after registration  
- ✅ Error and success feedback  
- [ ] Avatar / profile images  
- [ ] Emojis or reactions  
- [ ] Read receipts or typing indicators  
- [ ] Message editing/deleting  

---

## 📄 License

MIT — free to use, modify, or share.

---

## 🧠 About

This project was created by **Tanner Davis** for a real-world development challenge with Zimmer Marketing.

