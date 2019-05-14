/** 
    State selectors
*/
export const getWeb3FromState = (state: any) => state.mycurrency.web3;
export const getContractFromState = (state: any) => state.mycurrency.ReviewDAOContract;
export const getAccountFromState = (state: any) => state.mycurrency.account;