import Express from "express";
import uniqid from "uniqid";
import { getAuthors, writeAuthors } from "../../lib/fs-tools.js";
import {
  checkAuthorSchema,
  triggerBadRequest,
} from "../blogposts/blogpostSchema.js";

const authorsRouter = Express.Router();

authorsRouter.post(
  "/",
  checkAuthorSchema,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      const allAuthors = await getAuthors();
      const newAuthor = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: uniqid(),
      };

      allAuthors.push(newAuthor);
      await writeAuthors(allAuthors);

      res.status(201).send({ id: newAuthor.id });
    } catch (error) {
      next(error);
    }

    //   res.send();
  }
);

authorsRouter.get("/", async (req, res) => {
  try {
    const allAuthors = await getAuthors();
    console.log(allAuthors);
    res.send(allAuthors);
  } catch (error) {
    console.log(error);
  }
});

authorsRouter.get("/:authorsId", async (req, res) => {
  try {
    const authorId = req.params.authorsId;
    const allAuthors = await getAuthors();
    const author = allAuthors.find((author) => author.id === authorId);
    res.send(author);
  } catch (error) {
    console.log(error);
  }
});

authorsRouter.put(
  "/:authorsId",
  checkAuthorSchema,
  triggerBadRequest,
  async (req, res) => {
    try {
      const authorId = req.params.authorsId;
      const allAuthors = await getAuthors();
      const index = allAuthors.findIndex((author) => author.id === authorId);
      const oldAuthor = allAuthors[index];
      const updatedUser = { ...oldAuthor, ...req.body, updatedAt: new Date() };
      allAuthors[index] = updatedUser;
      await writeAuthors(allAuthors);
      res.send(updatedUser);
    } catch (error) {
      console.log(error);
    }
  }
);

authorsRouter.delete("/:authorsId", async (req, res) => {
  const authorId = req.params.authorsId;
  const allAuthors = await getAuthors();
  const remainingAuthors = allAuthors.filter(
    (author) => author.id !== authorId
  );
  await writeAuthors(remainingAuthors);
  res.status(204).send();
});

export default authorsRouter;
