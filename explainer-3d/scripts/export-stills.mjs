import { execSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const frames = [
  { name: "01-hook", frame: 45 },
  { name: "02-cutaway", frame: 240 },
  { name: "03-heat-out", frame: 360 },
  { name: "04-coils", frame: 520 },
  { name: "05-cycle", frame: 690 },
  { name: "06-close", frame: 900 },
];

mkdirSync("out/stills", { recursive: true });

for (const { name, frame } of frames) {
  const out = `out/stills/${name}.png`;
  console.log(`Exportando ${out} (frame ${frame})...`);
  execSync(
    `npx remotion still GeladeiraExplainer ${out} --frame=${frame} --gl=angle`,
    { stdio: "inherit" },
  );
}

console.log("Stills prontos em out/stills/");
