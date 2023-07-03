/**
 * Linea Voyage Week8
 * 
 * Author @3lang3 2023-07-01
 * Github: https://github.com/3lang3
 */

import { cli } from './utils/cli';
import { ethers } from 'ethers';

import * as pancake from './tasks/pancake';
import * as kyberswap from './tasks/kyberswap';
import * as airswap from './tasks/airswap';
import * as sushiswap from './tasks/sushiswap';
import * as uniswap from './tasks/uniswap';
import * as izumi from './tasks/izumi';
import * as squid from './tasks/squid';
import * as mendi from './tasks/mendi';
import * as dforce from './tasks/dforce';
import * as velocore from './tasks/velocore';
import * as zkex from './tasks/zkex';
import * as symbiosis from './tasks/symbiosis';
import * as cashmere from './tasks/cashmere';
import * as openocean from './tasks/openocean';
import * as noobysswap from './tasks/noobysswap/api';
import * as compound from './tasks/compound';
import * as zkusd from './tasks/zkusd';
import * as gridex from './tasks/gridex';
import { config } from './config';
import { loop } from './utils/utils';

const main = async (wallet: ethers.Wallet) => {
  await pancake.run(wallet)
  await compound.run(wallet);
  await kyberswap.run(wallet)
  await airswap.run(wallet)
  await sushiswap.run(wallet)
  await uniswap.run(wallet)
  await cashmere.run(wallet)
  await izumi.run(wallet)
  await zkusd.run(wallet)
  await squid.run(wallet)
  await mendi.run(wallet)
  await dforce.run(wallet)
  await velocore.run(wallet)
  await gridex.run(wallet)
  // await zkex.run(wallet)
  await symbiosis.run(wallet)
  await openocean.run(wallet);
  await noobysswap.run(wallet);
}

cli(async ({ action, pks, startIdx, endIdx }) => {
  if (action === 'pre_cashmere') {
    await cashmere.airdropTUSDT();
    return;
  }
  for (let k = startIdx; k <= endIdx; k++) {
    const pk = pks[k];
    const wallet = new ethers.Wallet(pk);
    try {
      if (config.loopUtilSuccess) {
        await loop(async () => {
          await main(wallet);
        })
      } else {
        await main(wallet);
      }
    } catch (error) {
      console.log(error?.reason || error?.message)
    }
  }
});
