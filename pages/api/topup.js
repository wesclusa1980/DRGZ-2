import {TransferTransaction, AccountId, TokenMintTransaction} from "@hashgraph/sdk"
import {client, tokenId, accountId, accountKey} from "../../utils/hedera-treasury";
import { query as q } from "faunadb";
import { guestClient } from "../../utils/fauna-client";

export default async function topup(req, res) {
    console.log(tokenId);
    console.log("Request", req.body);
    const {count, account_id, user_id} = req.body;
    try{

        const AccId = AccountId.fromString(account_id)
        console.log(AccId)
        const transaction = await new TransferTransaction()

        .addTokenTransfer(tokenId, accountId, -count)
    
        .addTokenTransfer(tokenId, AccId, count)
    
        .freezeWith(client);
    
        //Sign with the sender account private key
    
        const signTx = await transaction.sign(accountKey);
    
        //Sign with the client operator private key and submit to a Hedera network
    
        const txResponse = await signTx.execute(client);
    
        //Request the receipt of the transaction
    
        const receipt = await txResponse.getReceipt(client);
    
        //Obtain the transaction consensus status
    
        const transactionStatus = receipt.status;
    
        console.log("The transaction consensus status " +transactionStatus.toString());

        
        const tokenMinting = await new TokenMintTransaction()
            .setTokenId(tokenId)
            .setAmount(count)
            .freezeWith(client);

        //Sign with the supply private key of the token 
        const mintingTx = await tokenMinting.sign(accountKey);

        const mintingtxResponse = await mintingTx.execute(client);

        //Request the receipt of the transaction
        const mintingreceipt = await mintingtxResponse.getReceipt(client);
            
        //Get the transaction consensus status
        const mintingStatus = mintingreceipt.status;

        console.log("The transaction minitng status " +mintingStatus.toString());


        const lastTopupUpdate = await guestClient.query(
            q.Update(
                q.Ref(q.Collection('User'), user_id),
                { data: { lastTopup:  count} },
            )
        );

        console.log(lastTopupUpdate);
        
        res.status(200).json({ topup: mintingStatus.toString() });
    } catch (error) {
        console.error(error);
        res.status(error.requestResult.statusCode).send(error.message);
    }
}
