import Express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import blogpostsRouter from "./api/blogposts/index.js";
import authorsRouter from "./api/authors/index.js";
import {
  badReqHandler,
  generalErrorHandler,
  notFoundHandler,
} from "./errorsHandlers.js";
import avatarRouter from "./api/files/avatar.js";
import coverRouter from "./api/files/cover.js";
import commentsRouter from "./api/comments/index.js";

const server = Express();
const port = 3001;

server.use(cors());
server.use(Express.static("public"));

server.use(Express.json());

server.use("/authors", authorsRouter);
server.use("/blogposts", blogpostsRouter);
server.use("/authors", avatarRouter);
server.use("/blogposts", coverRouter);
server.use("/blogposts", commentsRouter);

server.use(badReqHandler);
server.use(notFoundHandler);
server.use(generalErrorHandler);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("Server works on port: ", port);
});
