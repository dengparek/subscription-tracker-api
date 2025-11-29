import { connectDB } from "./database/db";
import { NODE_ENV, PORT } from "./config/env";
import { app } from "./index";

// Start server after connecting to DB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server started successfully on port:${PORT} in ${NODE_ENV} mode`
      );

      console.log(`Server running at port:${PORT} in ${NODE_ENV} mode`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB: " + err.message);
  });
