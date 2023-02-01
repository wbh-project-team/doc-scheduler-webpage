import { ethers } from 'ethers';
import { coingecko } from '../constants/urls';

let coinToUsdPrice = 0.0;
//todo reload after time
let renewCache = true;

export const getUsdOfCoin = async (address?: string, network?: string) => {
	let url;
	if (address)
		url = `${coingecko}/simple/token_price/${network}?&contract_addresses=${address}&vs_currencies=usd`;
	// url = `${coingecko}/simple/token_price/aurora?&contract_addresses=0xB12BFcA5A55806AaF64E99521918A4bf0fC40802&vs_currencies=usd`;
	else url = `${coingecko}/simple/price?ids=ethereum&vs_currencies=usd`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
	const json = await response.json();

	address = address?.toLowerCase();
	return address ? (json[address] ? json[address].usd : 0) : json.ethereum.usd;
};

export const coinToUsd = async (value: number, address?: string, network?: string) => {
	if (renewCache) {
		coinToUsdPrice = await getUsdOfCoin(address, network);
		renewCache = false;
	}

	return +coinToUsdPrice * +value;
};
