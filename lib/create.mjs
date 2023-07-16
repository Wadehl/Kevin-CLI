/*
 * 新建项目
 * @author: Kevin Kwok
 * @date: 2023-07-15
 */

import inquirer from "inquirer";
import path from "path";
import fs from "fs-extra";

import generateTemplate from "./generateTemplate.mjs";

const selectTechStack = async () => {
  const answers = await new inquirer.prompt([
    {
      name: "Technology Stack",
      type: "checkbox",
      choices: [
        {
          name: "Eslint 🐥",
          checked: true,
          value: "eslint",
        },
        {
          name: "TypeScript 🐤",
          checked: true,
          value: "ts",
        },
        {
          name: "Vue Router 🐥",
          value: "router",
        },
        {
          name: "Pinia 🍍",
          checked: true,
          value: "pinia",
        },
      ],
    },
  ]);
  return answers;
};

const createProjectFolder = async (project, options) => {
  const cwd = process.cwd();
  const targetDictionary = path.join(cwd, project);
  if (fs.existsSync(targetDictionary)) {
    if (options.force) {
      await fs.remove(targetDictionary);
    } else {
      const res = await inquirer.prompt([
        {
          name: "overwrite",
          type: "confirm",
          message: "Target directory exists. Continue?",
        },
      ]);
      if (!res) {
        console.log("User cancelled! Bye! 👋");
        return;
      } else {
        await fs.remove(targetDictionary);
        console.log("removed successfully");
      }
    }
  }
  return targetDictionary;
};

const createProject = async (project, cmd) => {
  console.clear();
  const targetDictionary = await createProjectFolder(project, cmd);
  // Tech Stack Options
  const answers = await selectTechStack();

  await generateTemplate(answers["Technology Stack"], targetDictionary);
};

export default createProject;
