import Express from "express";

import fs from "fs";

import { fileURLToPath } from "url";

import { dirname, join } from "path";

import uniqid from "uniqid";

const authorsRouter = Express.Router();

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
);

const writeAuthors = (allAuthorsArr) => {
  fs.writeFileSync(authorsJSONPath, JSON.stringify(allAuthorsArr));
};

const getAuthors = () => JSON.parse(fs.readFileSync(authorsJSONPath));

authorsRouter.post("/", (req, res) => {
  try {
    const allAuthors = getAuthors();
    const newAuthor = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: uniqid(),
    };

    console.log(newAuthor, allAuthors);

    allAuthors.push(newAuthor);
    writeAuthors(allAuthors);

    res.status(201).send({ id: newAuthor.id });
  } catch (error) {
    console.log(error);
  }

  //   res.send();
});

authorsRouter.get("/", (req, res) => {
  try {
    const allAuthors = getAuthors();
    res.send(allAuthors);
  } catch (error) {
    console.log(error);
  }
});

authorsRouter.get("/:authorsId", (req, res) => {
  try {
    const authorId = req.params.authorsId;
    const allAuthors = getAuthors();
    const author = allAuthors.find((author) => author.id === authorId);
    res.send(author);
  } catch (error) {
    console.log(error);
  }
});

authorsRouter.put("/:authorsId", (req, res) => {});

authorsRouter.delete("/:authorsId", (req, res) => {});

export default authorsRouter;
