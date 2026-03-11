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

To start everything, open your terminal in the project folder and run:

```bash
docker compose up
```

Once it finishes loading, you can open your browser and go to `http://localhost:5173` to start using the tools.

### Stop the Application

To stop the project and clean up, run:

```bash
docker compose down
```

## Tech Stack

- **Frontend**: React & TypeScript
- **Backend**: Node.js & Express
- **AI Services**: Whisper (for transcribing audio and video)
