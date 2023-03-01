import Express from "express";

const authorsRouter = Express.Router();

authorsRouter.post("/", (req, res) => {});

authorsRouter.get("/", (req, res) => {});

authorsRouter.get("/:authorsId", (req, res) => {});

authorsRouter.put("/:authorsId", (req, res) => {});

authorsRouter.delete("/:authorsId", (req, res) => {});

export default authorsRouter;
