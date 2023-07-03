import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, approveErc20 } from '../base'
import { getTxtContent, loop, sleep, task } from '@/utils/utils';
import path from 'node:path';

const tUSDT = '0xf484ca938af7165d0a8d99746939b1b60a26f0af'
const ca = '0x7dea0cdce2dff29d0704ae95852d1bc553e412ff'
const tusdtAbi = ['function balanceOf(address) view returns (uint256)'];
const AIRDROP_OUTER_LINEA_ADDR = '0x975427167FB9ec0Ed468F0EBda16F3C194eEF699';

export const airdropTUSDT = async () => {
  const keys = getTxtContent(path.join(process.cwd(), './keys.txt')).filter(Boolean) as string[];
  // 检查每个钱包的tUSDT余额
  const tUSDTContract = new ethers.Contract(tUSDT, tusdtAbi, provider);
  const amounts: { balance: ethers.BigNumber, address: string; pk: string }[] = [];
  console.log(`[cashmere前置检查]开始检查${keys.length}个钱包中是否有符合空投tUSDT规则的钱包`)
  await Promise.all(
    keys.map(async (pk) => {
      await loop(async () => {
        const w = new ethers.Wallet(pk, provider);
        const balance = await tUSDTContract.balanceOf(w.address);
        amounts.push({ balance, pk, address: w.address });
      })
    })
  )

  const hasBalance = amounts.find(({ balance }) => balance.gte(ethers.utils.parseEther('1')));
  if (!hasBalance) {
    console.log(`[cashmere前置检查]未找到有tUSDT余额的钱包, 将跳过cashmere任务`)
    return false
  }
  console.log(`[cashmere前置检查]找到含有tUSDT余额的钱包, 执行空投tusdt任务`)
  const { balance, pk } = hasBalance;
  // 开始空投
  const airdropSigner = new ethers.Wallet(pk, provider);

  await approveErc20(airdropSigner, tUSDT, AIRDROP_OUTER_LINEA_ADDR);

  const airdropAddresses = amounts.map(({ address }) => address);
  const airdropAmount = balance.div(airdropAddresses.length.toString());

  const airdropAbi = ['function multiTransferToken(address, address[], uint256[])'];
  const airdropContract = new ethers.Contract(AIRDROP_OUTER_LINEA_ADDR, airdropAbi, airdropSigner);
  if (airdropAddresses.length > 200) {
    console.log(`[cashmere前置检查]空投地址数量超过200个, 将分批空投`)
  }
  while (airdropAddresses.length) {
    await loop(async () => {
      // 一次空投最多200个地址，分组空投
      const addrs = airdropAddresses.splice(0, 200);
      const airdropAmounts = Array(addrs.length).fill(airdropAmount);
      const tx = await airdropContract.multiTransferToken(
        tUSDT,
        addrs,
        airdropAmounts,
        await overrides(airdropSigner.address)
      )
      await tx.wait();
    })
  }
  console.log(`✅[cashmere前置检查]空投tUSDT完成, cashmere任务将按期执行`)
  return true;
}

export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);

  let abi = ['function deposit(address, uint16, uint256) payable'];
  const contract = new ethers.Contract(ca, abi, signer);

  const tUSDTContract = new ethers.Contract(tUSDT, tusdtAbi, signer);

  await task(async () => {
    const tUSDTBalance = await tUSDTContract.balanceOf(wallet.address);
    if (tUSDTBalance.isZero()) {
      console.log('tUSDT余额为0, 无法完成任务');
      return
    }

    await approveErc20(signer, tUSDT, ca);
    const tx = await contract.deposit(
      wallet.address,
      1,
      tUSDTBalance,
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

