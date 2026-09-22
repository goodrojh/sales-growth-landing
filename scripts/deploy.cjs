// Сборка и публикация в ветку gh-pages: npm run deploy
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const repo = "sales-growth-landing";
const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });

run("npx next build", { env: { ...process.env, NEXT_PUBLIC_BASE_PATH: "/" + repo } });
fs.writeFileSync(path.join("out", ".nojekyll"), "");
const remote = execSync("git remote get-url origin").toString().trim();
const o = { cwd: "out" };
run("git init -q -b gh-pages", o);
run("git add -A", o);
run('git -c user.name=deploy -c user.email=deploy@local commit -qm "deploy"', o);
run(`git push -f ${remote} gh-pages`, o);
fs.rmSync(path.join("out", ".git"), { recursive: true, force: true });
