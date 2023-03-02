import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const authorsJSONPath = join(dataFolderPath, "authors.json");
const blogpostsJSONPath = join(dataFolderPath, "blogposts.json");
const authorsPublicFolderPath = join(process.cwd(), "./public/img/authors");

export const getAuthors = () => readJSON(authorsJSONPath);
export const writeAuthors = (allAuthors) =>
  writeJSON(authorsJSONPath, allAuthors);
export const getBlogposts = () => readJSON(blogpostsJSONPath);
export const writeBlogposts = (allBlogposts) =>
  writeJSON(blogpostsJSONPath, allBlogposts);

export const saveAuthorImg = (fileName, fileContentAsBuffer) =>
  writeFile(join(authorsPublicFolderPath, fileName), fileContentAsBuffer);
