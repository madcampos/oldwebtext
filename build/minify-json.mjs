/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */
import { readFile, writeFile } from 'fs/promises';

export default async function minifyJson(fileName, extension, env) {
	if (extension === '.json' || extension === '.webmanifest') {
		const content = await readFile(fileName, { encoding: 'utf8' });
		// eslint-disable-next-line prefer-named-capture-group
		const replacedVars = content.replaceAll(/%(.+?)%/giu, (_, match) => env[match] ?? '');
		const minifiedContent = JSON.stringify(JSON.parse(replacedVars));

		await writeFile(fileName, minifiedContent, { encoding: 'utf8' });
	}
}
