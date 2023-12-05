import { ZeroAddress, isAddress } from "ethers";
import { getNativeBalance, getTokenBalance } from "../utils.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Request} res
 * @returns {Promise<import('express').Response>}
 */
export const getBalance = async (req, res) => {
  try {
    let { tokenAddress, userAccount } = req.params;
    // in case we were called without tokenAddress (eth balance)
    tokenAddress = tokenAddress || ZeroAddress;

    if (!isAddress(tokenAddress)) {
      return res.status(400).json({ error: "Invalid token address" });
    }

    if (!isAddress(userAccount)) {
      return res.status(400).json({ error: "Invalid user account" });
    }

    let balance;

    if (tokenAddress == ZeroAddress) {
      balance = await getNativeBalance(userAccount);
    } else {
      balance = await getTokenBalance(tokenAddress, userAccount);
    }

    return res.json(balance);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
