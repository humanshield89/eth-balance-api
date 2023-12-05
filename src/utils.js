import minERC20ABI from "./abis/erc20minimal.json" assert { type: "json" };
import { JsonRpcProvider, ethers, formatEther, formatUnits } from "ethers";

/**
 * @typedef {Object} Balance
 * @property {string} value
 * @property {string} formatted
 * @property {number} decimals
 */

/**
 *
 * @param {string} address
 * @returns  {Promise<Balance>}
 */
export const getNativeBalance = async (address) => {
  // TODO: multichain chan be supported by taking chainId as a param
  const provider = new JsonRpcProvider(process.env.ETH_RPC);

  const balance = await provider.getBalance(address);

  return {
    value: balance.toString(),
    formatted: formatEther(balance),
    decimals: 18,
  };
};

/**
 *
 * @param {string} tokenAddress
 * @param {string} userAccount
 * @returns {Promise<Balance>}
 */
export const getTokenBalance = async (tokenAddress, userAccount) => {
  // TODO: multichain chan be supported by taking chainId as a param
  const provider = new JsonRpcProvider(process.env.ETH_RPC);

  const tokenContract = new ethers.Contract(
    tokenAddress,
    minERC20ABI,
    provider
  );

  // TODO: multicall would be better here
  const [balance, decimals] = await Promise.all([
    tokenContract.balanceOf(userAccount),
    tokenContract.decimals(),
  ]);

  return {
    value: balance.toString(),
    formatted: formatUnits(balance, decimals),
    decimals: parseInt(decimals.toString()),
  };
};
