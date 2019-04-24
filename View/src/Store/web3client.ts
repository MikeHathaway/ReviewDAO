const web3 = (global as any).web3;

// Import ABI from compiled smart contracts
import reviewDAOAbi from "./abi/DappToken.json"
// const parsedAbi = JSON.parse(reviewDAOAbi);

/** Connect to Smart Contract */
const contractAddr = '0x09233d0f7c706D7F9B0Cba18687fB16c49EcD65d';

const tokenContract: any = getContract(reviewDAOAbi.abi, contractAddr);

export function getContract(abi: object, address: string) {
    return web3.eth.contract(abi).at(address);
}

/** Get Account Information */
export function getAccount(): string {
    return web3.eth.defaultAccount;
}

export async function getToken(address?: string): Promise<number> {
    address = address || getAccount();
    
    const result = await promisify((f) => tokenContract.balanceOf(address, f));
    return result.toNumber();
}

export function promisify(fn: (cb: any) => any): Promise<any> {
    return new Promise((resolve, reject) => {
        fn((err: any, result: any) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

/** Transfer Token */
export async function transferToken(amount: number, to: string): Promise<void> {
    await promisify((f) => tokenContract.transfer(amount, to, f));
}