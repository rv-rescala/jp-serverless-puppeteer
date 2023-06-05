import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';


const dir = process.argv[2];
const configPath = resolve(dir, 'tsconfig.json');
console.log("configPath", configPath);

// remove trailing commas
const configText = readFileSync(configPath, 'utf-8');
const correctedText = configText.replace(/,\s*([}\]])/g, '$1');

const config = JSON.parse(correctedText);
config.compilerOptions.module = 'commonjs';
config.compilerOptions.esModuleInterop = true;
writeFileSync(configPath, JSON.stringify(config, null, 2));
