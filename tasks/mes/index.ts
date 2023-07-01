import { ethers } from 'ethers';
import { lineaProvider as provider, overrides } from '../base'
import { task } from '@/utils/utils';

const domain = {
  "name": "MES",
  "version": "1.0",
  "chainId": "59140"
}

const types = {
  "WithdrawRequest": [
    {
      "name": "route",
      "type": "string"
    },
    {
      "name": "userAddress",
      "type": "address"
    },
    {
      "name": "symbol",
      "type": "string"
    },
    {
      "name": "destinationChainId",
      "type": "string"
    },
    {
      "name": "withdrawAmount",
      "type": "string"
    }
  ]
}

// @todo all task
// https://docs.linea.build/use-linea/explore/use-mesprotocol#deposit
export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const ca = '0x8f3Ddd0FBf3e78CA1D6cd17379eD88E261249B52'
  let abi = ['function deposit(address, uint256) payable'];
  const contract = new ethers.Contract(ca, abi, signer);
  const amount = ethers.utils.parseEther('0.01');
  await task(async () => {
    const tx = await contract.deposit(
      ethers.constants.AddressZero,
      amount,
      {
        ...await overrides(wallet.address),
        value: amount
      }
    )
    await tx.wait();
  }, {
    taskName: 'mes_deposit',
    walletAddr: wallet.address,
  })

  // const values = {
  //   "route": "Single",
  //   "userAddress": wallet.address,
  //   "symbol": "ETH",
  //   "destinationChainId": "59140",
  //   "withdrawAmount": "0.001"
  // }
  // const signature = await wallet._signTypedData(domain, types, values);

  // abi = ['function claimTokens(address, uint256)']
  
  // await task(async () => {
  //   const tx = contract.claimTokens(
  //     ethers.constants.AddressZero,
  //     amount,
  //   )
  //   await tx.wait();
  // }, {
  //   taskName: 'mes_claimTokens',
  //   walletAddr: wallet.address,
  // })
}

