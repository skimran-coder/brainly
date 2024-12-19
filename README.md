# Second Brain

Second Brain is a modern full-stack application designed to help users store and organize their important links for future reference. With this app, users can manage their personal "brain" of saved links and even share it publicly with others. Whether you're bookmarking resources, articles, or tweets, Second Brain makes it easy to keep your ideas organized and accessible.

## Features

### Core Functionality
- **Save Links:** Store your essential links and categorize them for future reference.
- **Organize by Tags:** Tag your saved links to make them easier to find and group.
- **Public Sharing:** Share your brain (saved links) with others by making it public.

### Future Enhancements
- **Search Functionality:** Planned feature to enable searching within your saved links for quick access.
- **AI Integration:** Future updates may include AI-powered insights and recommendations based on your saved links.

## Tech Stack

- **Frontend:** React.js, Redux Toolkit, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Hosting:** Hosted on vercel for frontend and render for server.

## How It Works

1. **Sign Up or Log In**: Create an account or log in to access your Second Brain.
2. **Save Links**: Add URLs with relevant details and tags to your private brain.
3. **Manage Links**: Update or delete saved links anytime.
4. **Public Brain**: Share your curated collection of links by marking it public.

## Installation

Follow these steps to set up the project locally:

### Prerequisites
- Node.js and npm installed
- MongoDB set up locally or a MongoDB Atlas account

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/second-brain.git
   cd second-brain
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

4. Run the application:
   ```bash
   npm run dev
   ```

5. Access the app:
   Open `http://localhost:5000` in your browser.

## Usage

1. **Log In:** Authenticate with your account to access your personal Second Brain.
2. **Add Links:** Use the "Add Link" feature to save a URL along with tags and descriptions.
3. **Public Brain:** Toggle the visibility of your brain to share it publicly.
4. **Organize Links:** Use tags to group and organize your saved links.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

### Note
Currently, the app does not support querying your brain or AI-powered question answering. These features may be added in future updates.
