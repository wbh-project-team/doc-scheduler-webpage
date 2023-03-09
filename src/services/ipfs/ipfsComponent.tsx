import IPFS from 'ipfs-http-client';

export default function IpfsComponent() {
	const ipfs = IPFS.create();
	const text = 'My string to be stored on IPFS';
	[];

	async function storeString() {
		const { cid } = await ipfs.add(text);
		console.log(`String stored at CID ${cid}`);
	}

	async function getString() {
		const { cid } = await ipfs.add(text);
		const data = await ipfs.get(cid);
		const newText = data.toString();
		console.log(`String fetched from IPFS: ${newText}`);
	}

	return (
		<div>
			<button onClick={storeString}>Store string on IPFS</button>
			<button onClick={getString}>Get string from IPFS</button>
		</div>
	);
}
