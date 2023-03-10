import { Web3Storage, getFilesFromPath } from 'web3.storage';
const token = process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY;

export async function ipfsUpload(name: string) {
	if (!token) {
		console.log(token);
		console.log('error');
		return;
	}

	const storage = new Web3Storage({ token });

	const cid = await storage.put(makeFileObjects(name));
	console.log('Content added with CID:', cid);
	return cid;
}

function makeFileObjects(name: string) {
	const obj = { name: name };
	const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
	const files = [new File([blob], 'name.json')];
	return files;
}

export async function retrieve(cid: string) {
	if (!token) {
		console.log(token);
		console.log('error');
		return;
	}
	const storage = new Web3Storage({ token });
	const res = await storage.get(cid);
	if (!res) {
		throw new Error(`failed to get ${cid}`);
	}

	const files = await res.files();
	return JSON.parse(await files[0].text());
}
