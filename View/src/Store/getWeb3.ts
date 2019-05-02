import Web3 from "web3";

declare global {
    interface Window { web3: any; }
}

const getWeb3 = () =>
    new Promise((resolve, reject) => {
        window.addEventListener("load", () => {
            let web3 = window.web3;
            const alreadyInjected = typeof web3 !== "undefined";
            if (alreadyInjected) {
                web3 = new Web3(web3.currentProvider);
                console.log("Injected web3 detected.");
                resolve(web3);
            } else {
                const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
                web3 = new Web3(provider);
                console.log("No web3 instance injected, using Local web3.");
                resolve(web3);
            }
        });
  });

export default getWeb3;