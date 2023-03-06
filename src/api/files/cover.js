import Express from "express";
import createHttpError from "http-errors";
import multer from "multer";
import { extname } from "path";
import { getBlogposts, saveCover, writeBlogposts } from "../../lib/fs-tools.js";

const coverRouter = Express.Router();

coverRouter.post(
  "/:blogpostsId/uploadCover",
  multer().single("cover"),
  async (req, res, next) => {
    try {
      const allBlogposts = await getBlogposts();
      const blogpostId = req.params.blogpostsId;
      const index = allBlogposts.findIndex((e) => e.id === blogpostId);
      if (index !== -1) {
        const originalFileExt = extname(req.file.originalname);
        const fileName = blogpostId + originalFileExt;
        await saveCover(fileName, req.file.buffer);
        const olfPost = allBlogposts[index];
        const updatedAuthor = {
          ...olfPost,
          ...req.body,
          cover: `http://localhost:3001/img/cover/${fileName}`,
          updatedAt: new Date(),
        };
        allBlogposts[index] = updatedAuthor;
        await writeBlogposts(allBlogposts);
        res.send({ message: "Cover has been updated" });
      } else {
        next(
          createHttpError(404, `Blogpost with the id: ${blogpostId} not found.`)
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default coverRouter;
