![Papertrail Banner](frontend/public/assets/banner.jpg)

# Papertrail

Papertrail is a tool that helps you turn audio, video, and notes into professional documents. You can use it to create social media captions, formal letters, and meeting summaries quickly and easily.

The project is designed to be private and straightforward, working directly in your browser without requiring you to create an account or store your data permanently.

## Main Tools

- **Caption Generator**: Create engaging posts for social media.
- **Letter Generator**: Write professional letters for work or personal use.
- **Meeting Minutes (MoM)**: Automatically summarize your meetings from audio or video recordings.

## How to Run the Project

You will need [Docker](https://www.docker.com/get-started) installed on your computer to run this project.

### Start the Application

No environment files are required just to start the application. Open a terminal in the project folder and run:

```bash
docker compose up
```

Once the services are running, open `http://localhost:5173` in your browser to start using the tools.

### Enable AI Generation

Caption and meeting-minutes generation use the Hugging Face Inference API and require an API token. To enable these features, copy the backend example file and add your token:

```bash
cp backend/.env.example backend/.env
```

On Windows PowerShell, use:

```powershell
Copy-Item backend\.env.example backend\.env
```

Replace the placeholder value for `HF_API_KEY` in `backend/.env`, then restart the services with `docker compose up`. Compose loads this file when it exists; without it, the containers can still start, but AI-generated captions and meeting summaries will not work. Keep `.env` files local; do not commit your API token. The frontend uses the local backend URL by default and does not need its own `.env` file for the default setup. This optional env-file syntax requires Docker Compose 2.24.0 or later.

### Stop the Application

To stop the project and clean up, run:

```bash
docker compose down
```

## Tech Stack

- **Frontend**: React & TypeScript
- **Backend**: Node.js & Express
- **AI Services**: Whisper (for transcribing audio and video)
