# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c1b9b1d7-08e2-410c-b3c8-d7b4307f86d4

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c1b9b1d7-08e2-410c-b3c8-d7b4307f86d4) and start prompting.

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

## Environment setup

Fill in the Supabase credentials in `.env.development` or `.env.production` depending on your target environment.

Use `.env.development` with your local Supabase instance and `.env.production` with the remote one.

## Running locally

1. Install dependencies:

```bash
npm install
```

2. Start Supabase and apply migrations (requires the [Supabase CLI](https://supabase.com/docs/guides/cli)):

```bash
supabase start
supabase db reset
```

3. Run the development server:

```bash
npm run dev
```

After running these commands the application will be available on <http://localhost:5173>.

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

Simply open [Lovable](https://lovable.dev/projects/c1b9b1d7-08e2-410c-b3c8-d7b4307f86d4) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)


## Documentation
- [Commit History May 9 - Jun 9, 2025](docs/commits/commits_May9-Jun9_2025.md)
- [Commit History Jun 10 - Jun 12, 2025](docs/commits/commits_Jun10-Jun12_2025.md)
- [Commit History Jun 13 - Jun 23, 2025](docs/commits/commits_Jun13-Jun23_2025.md)
- [Technical Documentation](docs/technical/README.md)
- [Storybook Theme Docs](docs/technical/storybook-theme.md)
