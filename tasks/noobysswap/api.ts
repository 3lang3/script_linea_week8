import { ethers } from 'ethers';
import { task } from '@/utils/utils';

export const swap = async (wallet: ethers.Wallet) => {

  await task(async () => {
    let r = await fetch("https://api.noobysswap.io/api/swap", {
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
      "referrer": "https://noobysswap.io/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"address\":\"${wallet.address}\"}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });
    await r.json()
  }, {
    taskName: 'noobysswap_swap',
    walletAddr: wallet.address,
  })
}

export const addLq = async (wallet: ethers.Wallet) => {
  await task(async () => {
    let r = await fetch("https://api.noobysswap.io/api/liquidity", {
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
      "referrer": "https://noobysswap.io/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"address\":\"${wallet.address}\"}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });
    await r.json()
  }, {
    taskName: 'noobysswap_addLq',
    walletAddr: wallet.address,
  })
}

export const run = async (wallet: ethers.Wallet) => {
  await swap(wallet);
  await addLq(wallet);
}