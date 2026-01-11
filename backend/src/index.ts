import app from "./app";
import "dotenv/config"

console.log(process.env.DATABASE_URL)
const PORT = Number(process.env.PORT) || 4000;

const server = app.listen(PORT,"0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


