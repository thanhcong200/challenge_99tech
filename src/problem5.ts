import { APP_PORT } from "./common/environment";
import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    app.listen(APP_PORT, () => {
      console.log(`🚀 Server running on http://localhost:${APP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error during Data Source initialization", err);
  });
