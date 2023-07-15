/*
 * 初始化命令行
 * @author: Kevin Kwok
 * @date: 2023-07-15
 */

import { program } from "commander";
import chalk from "chalk";

import createProject from "../lib/create.mjs";
import greeting, { getVersion } from "../lib/information.mjs";

const init = async () => {
  await greeting();

  program
    .name("kevin-cli")
    .usage(`<command> [option]`)
    .version(`kevin-cli ${await getVersion()}`);

  program
    .command("create <project-name>")
    .description("create a new project")
    .option("-f --force", "overwrite target directory if it exist")
    .action(async (projectName, cmd) => {
      await createProject(projectName, cmd);
    });

  program.on("--help", function () {
    console.log();
    console.log(
      `Run ${chalk.cyan(
        "kevin-cli <command> --help"
      )} for detailed usage of given command.`
    );
    console.log();
  });

  return program;
};

export default init;
