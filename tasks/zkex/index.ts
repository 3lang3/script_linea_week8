import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, approveErc20, logGasCost } from '../base'
import { task } from '@/utils/utils';
import axios from 'axios';

// @todo withdraw
export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const signature = await signer.signMessage(`Sign this message to connect with ZKEX services.\nNOTE: Please check this website ends with \"app.zkex.com\".`)

  let res: any = await fetch("https://aws-test-1.zkex.com/api-v1/api/users", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    },
    "referrer": "https://testnet.app.zkex.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": `{\"verifyType\":0,\"chainId\":7,\"address\":\"${wallet.address.toLocaleLowerCase()}\",\"message\":\"Sign this message to connect with ZKEX services.\\nNOTE: Please check this website ends with \\\"app.zkex.com\\\".\",\"signature\":\"${signature}\"}`,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  });
  const token = res.headers.get('access-token');
  
  // res = await fetch("https://aws-test-1.zkex.com/api-v1/api/layer2/users/nonce", {
  //   "headers": {
  //     "accept": "application/json, text/plain, */*",
  //     "accept-language": "zh-CN,zh;q=0.9",
  //     "access-token": token,
  //     "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
  //     "sec-ch-ua-mobile": "?0",
  //     "sec-ch-ua-platform": "\"macOS\"",
  //     "sec-fetch-dest": "empty",
  //     "sec-fetch-mode": "cors",
  //     "sec-fetch-site": "same-site"
  //   },
  //   "referrer": "https://testnet.app.zkex.com/",
  //   "referrerPolicy": "strict-origin-when-cross-origin",
  //   "body": null,
  //   "method": "GET",
  //   "mode": "cors",
  //   "credentials": "include"
  // });

  const pepeCa = '0x1f524c32bb57107eed4a9383287fb008a5b10e1c';
  let abi = ['function mint()'] as any;
  let contract = new ethers.Contract(pepeCa, abi, signer);
  await task(async () => {
    const tx = await contract.mint(await overrides(wallet.address),)
    logGasCost(await tx.wait())
  }, {
    taskName: 'zkex_mint_pepe',
    walletAddr: wallet.address,
  })

  // deposit
  const ca = '0x4931Cb9e5Fc58Be00C5Fd133D0961347f3406B86'
  abi = ['function depositERC20(address, uint104, address, uint8, bool)']
  contract = new ethers.Contract(ca, abi, signer);
  await task(async () => {
    // approve
    const coin = await approveErc20(signer, pepeCa, '0x4931cb9e5fc58be00c5fd133d0961347f3406b86')
    const balance = await coin.balanceOf(wallet.address);
    const tx = await contract.depositERC20(
      '0x1f524C32Bb57107Eed4a9383287fb008a5B10e1c',
      balance,
      wallet.address,
      1,
      false,
      await overrides(wallet.address),
    )
    logGasCost(await tx.wait())
  }, {
    taskName: 'zkex_deposit_pepe',
    walletAddr: wallet.address,
    force: true
  })
}