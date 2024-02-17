import "dotenv/config";
import app from "./app";

const defaultPort = 3333;
app.listen(defaultPort, () => {
  console.log(`Server running on port ${defaultPort}`);
});
