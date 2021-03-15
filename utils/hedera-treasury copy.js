require("dotenv").config();

const { Client, PrivateKey, AccountId } = require("@hashgraph/sdk");

// console.log("PK", process.env.PRIVATE_KEY)

export const tokenId = process.env.TOKENID;
export const accountKey = "302e020100300506032b657004220420063dbbf0d5c090006dd95fd651519e30a345d8a8c0f72d35901ae444014d220e";
export const accountId = "0.0.385071";
export const client = Client.forTestnet().setOperator(accountId, accountKey);
export const PRIVATE_KEY = "302e020100300506032b657004220420063dbbf0d5c090006dd95fd651519e30a345d8a8c0f72d35901ae444014d220e"
