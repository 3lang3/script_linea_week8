import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, approveErc20, logGasCost } from '../base'
import axios from 'axios';
import erc20abi from '@/const/erc20.json'
import { randomUUID } from 'node:crypto'
import { task } from '@/utils/utils';
import { makerAbi, swapAbi } from './abi';

export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const routerCa = '0x426B751AbA5f49914bFbD4A1E45aEE099d757733'
  const routerContract = new ethers.Contract(routerCa, swapAbi, signer);
  const makerCa = '0x36e56cc52d7a0af506d1656765510cd930ff1595'
  const makerContract = new ethers.Contract(makerCa, makerAbi, signer);

  await task(async () => {
    const deadline = Math.floor(Date.now() / 1000) + 60 * 2000;
    const datas = [];
    datas.push(
      routerContract.interface.encodeFunctionData('exactInputSingle', [
        [
          "0x2C1b868d6596a18e32E61B901E4060C872647b6C",
          "0x1A7b6683348727430863F544dF03a7d196bc17Dc",
          5,
          wallet.address,
          deadline,
          100000000000000,
          Math.floor(Math.random() * 174680) + 1,
          0
        ]
      ])
    )
    datas.push(
      routerContract.interface.encodeFunctionData('refundNativeToken', [])
    )
    const tx = await routerContract.multicall(datas, {
      ...await overrides(wallet.address),
      value: ethers.utils.parseEther('0.0001'),
    })
    logGasCost(await tx.wait())
  }, {
    taskName: 'gridex_swap',
    walletAddr: wallet.address,
  });

  await task(async () => {
    const deadline = Math.floor(Date.now() / 1000) + 60 * 2000;
    const params = [
      deadline,
      wallet.address,
      "0x2C1b868d6596a18e32E61B901E4060C872647b6C",
      "0x1A7b6683348727430863F544dF03a7d196bc17Dc",
      5,
      false,
      201650,
      100000000000000
    ];
    const tx = await makerContract.placeMakerOrder(params, {
      ...await overrides(wallet.address),
      value: ethers.utils.parseEther('0.0001'),
    })
    logGasCost(await tx.wait())
  }, {
    taskName: 'gridex_place_makerorder',
    walletAddr: wallet.address,
  })

  await task(async () => {
    const deadline = Math.floor(Date.now() / 1000) + 60 * 2000;
    const params = [
      deadline,
      wallet.address,
      "0x2C1b868d6596a18e32E61B901E4060C872647b6C",
      "0x1A7b6683348727430863F544dF03a7d196bc17Dc",
      5,
      false,
      [
        [
          201930,
          5000000000000
        ],
        [
          201365,
          5000000000000
        ]
      ]

    ]
    const tx = await makerContract.placeMakerOrderInBatch(params, {
      ...await overrides(wallet.address),
      value: ethers.utils.parseEther('0.00001'),
    })
    logGasCost(await tx.wait())
  }, {
    taskName: 'gridex_place_makerorder_batch',
    walletAddr: wallet.address,
  })
}