

## 📖 What is this?

**COLAB** is a collaboration tool designed to live alongside or inside a design application (like Figma). It acts as a "super-sidebar" that helps design teams communicate, manage tasks, and get AI assistance without leaving their creative environment.

Imagine a digital assistant that sits next to your design canvas. It keeps track of who is doing what, lets you chat with your team, organizes feedback, and even uses Artificial Intelligence to analyze your designs for mistakes.

---

## 🛠️ Technologies Used

This project is built using a modern, fast, and robust technology stack:

### Frontend (What you see)
* **React (with TypeScript):** The library used to build the user interface. TypeScript ensures the code is strict and less prone to errors.
* **Vite:** A super-fast tool that builds and runs the website.
* **Tailwind CSS:** Used for styling. It allows for quick, beautiful designs using utility classes.
* **Shadcn UI:** A collection of pre-built, accessible components (like buttons, inputs, dialogs) based on **Radix UI**. This gives the app a polished, professional look "out of the box."
* **Lucide React:** Provides the clean, modern icons used throughout the app.

### Backend (The brain and storage)
* **Supabase:** An open-source alternative to Firebase. It provides:
    * **Database (PostgreSQL):** Stores all users, messages, tasks, and feedback.
    * **Authentication:** Handles user sign-up and login.
    * **Real-time:** Allows the chat and task board to update instantly without refreshing the page.
    * **Edge Functions:** Runs backend code (like talking to AI) securely in the cloud.

### Artificial Intelligence
* **Supabase Edge Functions:** Scripts running in the cloud that act as a bridge between the app and AI models (likely Google Gemini via the Lovable AI gateway, based on the code).

---

## ⚙️ How It Works (The Core Features)

The application is divided into several "Tabs," each serving a specific purpose. Here is a breakdown of each module:

### 1. 💬 Chat Tab (`ChatTab.tsx`)
* **Function:** A team chat tailored for the project.
* **How it works:** It connects to the Supabase `messages` table. When you send a message, it listens for changes in real-time.
* **Cool Feature:** You can mention the AI (`@AI`), and the backend will send the conversation history to an AI model to generate a helpful response about design or the current context.

### 2. 📝 Feedback Tab (`FeedbackTab.tsx`)
* **Function:** A structured way to give and receive design critiques.
* **The Problem it Solves:** Design feedback is often vague (e.g., "Make it pop").
* **The Solution:** It uses an **AI Clarifier**. When you type feedback, the app asks for the "Area" (e.g., Layout, Typography), the specific "Issue," and the "Expectation."
* **AI Integration:** Before sending, an AI function (`clarify-feedback`) rewrites your raw thoughts into professional, actionable feedback.

### 3. ✅ Tasks Tab (`TasksTab.tsx`)
* **Function:** A project management tool built right in.
* **Views:** You can switch between a **Board View** (Kanban style: To Do -> In Progress -> Done) and a **List View**.
* **Integration:** Feedback from the Feedback Tab and suggestions from the AI Tab can be converted directly into tasks with one click.

### 4. 🤖 Ask AI Tab (`AskAITab.tsx`)
* **Function:** An automated design critic.
* **How it works:** You select a design "Frame" (e.g., "Home Page"). The AI analyzes it for specific criteria like Layout, Typography, Color, or Accessibility.
* **Result:** It returns a list of issues with severity levels (High, Medium, Low) and suggestions on how to fix them. You can turn these suggestions into tasks immediately.

### 5. 📊 Reports Tab (`ReportsTab.tsx`)
* **Function:** Analytics for team leads.
* **Features:** shows who is contributing the most, the quality of work (based on AI scores), and activity heatmaps.

---

## 🚀 How to Set It Up

If you want to run this project on your own computer, follow these simple steps:

### Prerequisites
1.  **Node.js:** You need this installed to run JavaScript/React code.
2.  **Supabase Account:** You need a free project at [supabase.com](https://supabase.com).

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone <your-repo-url>
    cd nav-synchro-design-hub
    ```

2.  **Install Dependencies:**
    This downloads all the necessary code libraries listed in `package.json`.
    ```bash
    npm install
    # OR if you use bun
    bun install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env` in the root folder. You need to add your Supabase credentials here so the app knows which database to talk to.
    ```env
    VITE_SUPABASE_URL="your-project-url-from-supabase"
    VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-key-from-supabase"
    ```

4.  **Setup the Database:**
    Copy the SQL code from `supabase/migrations/...` and run it in the "SQL Editor" section of your Supabase dashboard. This creates the tables (Tasks, Messages, Feedback, etc.).

5.  **Run the Application:**
    Start the local development server.
    ```bash
    npm run dev
    ```
    Open your browser to the address shown (usually `http://localhost:8080`).

---

## 📂 Project Structure Simplified

* **`src/components/ui`**: The building blocks (Buttons, Text Inputs, Cards).
* **`src/components/plugin`**: The main features (Chat, Tasks, AI tabs).
* **`src/hooks`**: Helper functions, specifically `useAuth` to check if you are logged in.
* **`src/integrations/supabase`**: The configuration file that connects the app to the backend.
* **`src/pages`**: The main screens.
    * `Index.tsx`: The main dashboard.
    * `Auth.tsx`: The Login/Sign-up screen.
* **`supabase/functions`**: The server-side code that handles the AI logic securely.

---


## Project info

**URL**: https://lovable.dev/projects/fe866c61-ed42-4c00-a809-826e7a265395

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/fe866c61-ed42-4c00-a809-826e7a265395) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/fe866c61-ed42-4c00-a809-826e7a265395) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
