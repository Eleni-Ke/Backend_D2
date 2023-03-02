import Express from "express";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { checkBlogpostsSchema, triggerBadRequest } from "./blogpostSchema.js";
import {
  getBlogposts,
  writeBlogposts,
  getAuthors,
} from "../../lib/fs-tools.js";
import { check } from "express-validator";

const blogpostsRouter = Express.Router();

blogpostsRouter.post(
  "/",
  checkBlogpostsSchema,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      const newBlogpost = {
        ...req.body,
        id: uniqid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const allBlogposts = await getBlogposts();
      allBlogposts.push(newBlogpost);
      await writeBlogposts(allBlogposts);

      res.status(201).send({ id: newBlogpost.id });
    } catch (error) {
      next(error);
    }
  }
);

blogpostsRouter.get("/", async (req, res, next) => {
  try {
    const allBlogposts = await getBlogposts();
    if (req.query && req.query.title) {
      const matchedBlogposts = allBlogposts.filter((post) =>
        post.title.toLowerCase().includes(req.query.title.toLocaleLowerCase())
      );
      res.send(matchedBlogposts);
    } else {
      res.send(allBlogposts);
    }
  } catch (error) {
    next(error);
  }
});

export default blogpostsRouter;
