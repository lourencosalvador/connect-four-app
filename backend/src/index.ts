import dotenv from "dotenv";
import app from "./core/app";

dotenv.config();

const PORT = process.env.API_PORT || 3000;

const server = app();

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
