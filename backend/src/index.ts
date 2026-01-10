import app from "./app";
import "dotenv/config"

console.log(process.env.DATABASE_URL)
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


