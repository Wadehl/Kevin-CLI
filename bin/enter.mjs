#!/usr/bin/env node --experimental-modules

import init from "../lib/init.mjs";

const start = async () => {
  const program = await init();
  program.parse(process.argv);
};

start();
