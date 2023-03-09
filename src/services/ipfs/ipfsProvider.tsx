import { Web3Storage, getFilesFromPath } from 'web3.storage';
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFCZWRBRkI2ZTAzNzdFOWE2MEVBNTljQ0Q5N2IzRTNiOGNDMWJGOTYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzgzNjUzMjc0NDcsIm5hbWUiOiJUZXN0In0.mQqYpDa4fyhEOARpEoJAz2bk_oIFI70MXP1eDWor2co';

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
