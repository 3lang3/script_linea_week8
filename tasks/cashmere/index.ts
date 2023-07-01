import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, approveErc20 } from '../base'
import { loop, sleep, task } from '@/utils/utils';

// @todo 领水cf验证需要额外手段绕过
export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const tUSDT = '0xf484ca938af7165d0a8d99746939b1b60a26f0af'
  const ca = '0x7dea0cdce2dff29d0704ae95852d1bc553e412ff'
  let abi = ['function deposit(address, uint16, uint256) payable'];
  const contract = new ethers.Contract(ca, abi, signer);

  await task(async () => {
    let r = await fetch("https://faucet.cashmere.exchange/api/lineaZk/claim", {
      "headers": {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      "referrer": "https://faucet.cashmere.exchange/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"address\":\"${wallet.address}\"}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });
    await r.json()
  }, {
    taskName: 'cashmere_claim_tusdt',
    walletAddr: wallet.address,
    withLoop: true,
  })

  await approveErc20(signer, tUSDT, ca);

  const tUSDTContract = new ethers.Contract(tUSDT, ['function balanceOf(address) view returns (uint256)'], signer);
  const amount = ethers.utils.parseEther('0.01');

  const tUSDTBalance = await tUSDTContract.balanceOf(wallet.address);
  if (tUSDTBalance.lt(amount)) {
    console.log(`tUSDT余额不足，跳过...`)
    return
  }

  await task(async () => {
    await loop(async () => {
      const tUSDTBalance = await tUSDTContract.balanceOf(wallet.address);
      if (tUSDTBalance.gte(amount)) return
      await sleep(2000)
      throw Error(`tUSDT余额未到账，继续等待中...`)
    })
    const tx = await contract.deposit(
      wallet.address,
      1,
      amount,
      {
        ...await overrides(wallet.address),
      }
    )
    await tx.wait();
  }, {
    taskName: 'cashmere_deposit',
    walletAddr: wallet.address,
  })
}

