import Express from "express";

// import cors from "cors";

import listEndpoints from "express-list-endpoints";

import authorsRouter from "./api/authors/index.js";

const server = Express();
const port = 3001;

// server.use(cors());

// server.use(express.json());

server.use("/authors", authorsRouter);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("Server works on port: ", port);
});
