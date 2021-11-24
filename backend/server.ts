import http from "http";
import app from "./app";

const server: http.Server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  // tslint:disable-next-line:no-console
  console.log("Backend has started on port 3000");
});
