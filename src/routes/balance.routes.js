import { Router } from "express";
import { ZeroAddress, isAddress } from "ethers";
import { getNativeBalance, getTokenBalance } from "../utils.js";
import { getBalance } from "../controllers/balance.controller.js";

export const balanceRouter = Router();

balanceRouter.get("/balance/:tokenAddress/:userAccount", getBalance);
balanceRouter.get("/balance/:userAccount", getBalance);
