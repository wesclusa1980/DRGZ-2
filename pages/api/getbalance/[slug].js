import {AccountBalanceQuery} from "@hashgraph/sdk"
import {client, tokenId} from "../../../utils/hedera-treasury";
export default async function getbalance(req, res) {
    console.log("You are in balance")
    console.log("Request", req.query.slug);
    try{
        const bal = await new AccountBalanceQuery()
            .setAccountId(req.query.slug)
            .execute(client);
        console.log(tokenId)
        const balance = bal.tokens.toString();
        const parse_bal = JSON.parse(balance);
        res.status(200).json({ balance: parse_bal[tokenId] });
    } catch (error) {
        console.error(error);
        res.status(error.requestResult.statusCode).send(error.message);
    }
}
