import { createServer } from "node:http";
import app from "./app";
import { config } from "./config";
import { connectDatabase } from "./mongo";

void (async () => {
  await connectDatabase();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    console.log(`server running at http://localhost:${config.PORT}`);
  });
})();
