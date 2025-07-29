
# 🧠 GemmaTalks Chatbot

A local full-stack AI chat application powered by Ollama. Users can start new chats, send messages, view generated responses from LLMs, streamed responses token-by-token, can edit and delete chat and stop generation mid-way.

---

## 🔧 Tech Stack Used

- **Frontend:** [Next.js](https://nextjs.org/)
- **Backend:** [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- **Database:** PostgreSQL
- **ORM:** Prisma 
- **LLM:** [Ollama](https://ollama.com/) using `gemma3:1b` model

---

## 🚀 Setup Instructions

### 1. Clone the Repository

    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/Swanand12/GemmaTalks-Chatbot.git)

### 2. Set Up Ollama

1. **Download and install Ollama**  
   Visit the official website and follow the installation instructions:  
   👉 [https://ollama.com/](https://ollama.com/)

2. **Pull and run the gemma3:1b model**  
   Open your terminal and run:

    ```bash
    ollama pull gemma3:1b
    ollama run gemma3:1b

### 3. Configure the Database

#### Create and update `.env` inside the `server/` directory and add the database url and port:
    PORT=5000
    DATABASE_URL=postgresql://username:password@localhost:5432/your_database
    
#### Run prisma commands:
    
    cd server
    npx prisma generate
    npx prisma migrate dev --name init

### 3. Create and update `.env` inside the `client/` directory and add the backend url:

    NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
    
### 4. Install and Run the Backend

    cd server
    npm install
    npm run server

The backend will run on [http://localhost:5000](http://localhost:5000)

### 5. Install and Run the Frontend

    cd client
    npm install
    npm run dev

The frontend will run on [http://localhost:3000](http://localhost:3000)

    
