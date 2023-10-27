import * as E from 'fp-ts/Either.ts'
import * as abi from '#/abi/base/mod.ts'
import * as aerodrome from '#/dapp/base/aerodrome/mod.ts'
import * as baseswap from '#/dapp/base/baseswap/mod.ts'
import * as bassexchange from '#/dapp/base/bassexchange/mod.ts'
import { ContractName } from '#/abi/ContractName.ts'
import { TIMEFRAME, WALLET_ACCOUNT } from '#/env.ts'
import { balanceOf } from '#/dapp/base/mod.ts'
import { delay } from '#/code9/async/mod.ts'
import { floatToBigInt } from '#/bigint.ts'
import { log } from '#/log.ts'
import { millisecondsUntilNextTimeframe, toMs } from '#/code9/timeframe/mod.ts'
import { write } from '#/operation.ts'

const pause = async () => {
  await delay(10000)()
}

const logError = (error: Error) => {
  log.error({
    error,
    name: error.name,
    cause: error.cause,
    message: error.message,
    stack: error.stack,
  })
}

const bassExchangeStrategy = async (minimumBASSToHarvest: bigint) => {
  const pendingTokensResult = await bassexchange.getFarmAllPendingTokens('BASSEXCHANGE_FARM_ALL')
  if (pendingTokensResult > minimumBASSToHarvest) {
    await bassexchange.doFarmHarvestAllPositions('BASSEXCHANGE_FARM_ALL')
    await pause()
  }

  const amount = await balanceOf('base', 'BASSEXCHANGE_COIN_BASS', WALLET_ACCOUNT)
  if (amount > minimumBASSToHarvest) {
    await bassexchange.doStakeToken('BASSEXCHANGE_STAKER_BBASS', amount)
    await pause()
  }

  const pendingBBASSStakerTokensResult = await bassexchange.getStakerPendingTokens(
    'BASSEXCHANGE_STAKER_BBASS',
    'BASSEXCHANGE_COIN_BASS',
  )
  if (pendingBBASSStakerTokensResult > minimumBASSToHarvest) {
    await bassexchange.doStakerHarvestPosition('BASSEXCHANGE_STAKER_BBASS')
    await pause()
  }

  // TODO: Create a function that does the complete routing.
  // TODO: Keep healthy ETH amount in wallet: BASS->WETH && X%WETH->ETH & Y%WETH->USDBC
  const bassAmountIn = await balanceOf('base', 'BASSEXCHANGE_COIN_BASS', WALLET_ACCOUNT)
  if (bassAmountIn > minimumBASSToHarvest) {
    const wethAmountOut = await aerodrome.getAmountOut('BASSEXCHANGE_COIN_BASS', bassAmountIn, 'COIN_WETH', false)
    const usdbcAmountOut = await aerodrome.getAmountOut('COIN_WETH', wethAmountOut, 'COIN_USDBC', false)
    const timeout = BigInt(1696165522) * BigInt(2)
    await write({
      chainName: 'base',
      contractName: 'AERODROME_DAPP_SWAP',
      functionName: 'swapExactTokensForTokens',
      args: [
        bassAmountIn,
        usdbcAmountOut,
        [
          [
            abi['BASSEXCHANGE_COIN_BASS'].address,
            abi['COIN_WETH'].address,
            false,
            abi.AERODROME_DAPP_POOLFACTORY.address,
          ],
          [
            abi['COIN_WETH'].address,
            abi['COIN_USDBC'].address,
            false,
            abi.AERODROME_DAPP_POOLFACTORY.address,
          ],
        ],
        WALLET_ACCOUNT,
        timeout,
      ],
    })
    await pause()
  }

  // Deposit & Stake
  // TODO: Create a function for this.
  // TODO: Conditionally do this operation based on the balance. Check the radix for USDC, it's not the default.
  const usdbcAmountIn = await balanceOf('base', 'COIN_USDBC_PROXY_READ', WALLET_ACCOUNT)
  if (usdbcAmountIn > floatToBigInt(1.0)) {
    const usdbcAmountMinimum = usdbcAmountIn - usdbcAmountIn / BigInt(100)
    const timeout = BigInt(1696165522) * BigInt(2)
    await write({
      chainName: 'base',
      contractName: 'BASSEXCHANGE_FARM_USDBC',
      functionName: 'deposit',
      args: [
        abi['COIN_USDBC'].address,
        usdbcAmountIn,
        usdbcAmountMinimum,
        WALLET_ACCOUNT,
        timeout,
        true,
      ],
    })
    await pause()
  }
}

const _baseSwap = async () => {
  const harvestFarm = async (contractName: ContractName, minimumAmount = 1.0) => {
    const amount = await baseswap.getFarmPendingRewards(contractName)
    if (amount.bsxReward > floatToBigInt(minimumAmount)) {
      await baseswap.doFarmHarvestPosition(contractName)
    }
  }

  const poolToken = async (contractName: ContractName, stakerContractName: ContractName, minimumAmount = 1.0) => {
    const amount = await balanceOf(`base`, contractName, WALLET_ACCOUNT)
    if (amount > floatToBigInt(minimumAmount)) {
      await baseswap.doStakeToken(stakerContractName, amount)
    }
  }

  const redeemToken = async (contractName: ContractName, minimumAmount = 1.0) => {
    const amount = await balanceOf(`base`, contractName, WALLET_ACCOUNT)
    if (amount > floatToBigInt(minimumAmount)) {
      await baseswap.doRedeemVestedTokens(contractName, amount)
    }
  }

  const _zapToken = async (
    contractName: ContractName,
    _lpContractName: ContractName,
    _farmContractName: ContractName,
    minimumAmount = 1.0,
  ) => {
    const amount = await balanceOf(`base`, contractName, WALLET_ACCOUNT)
    if (amount > floatToBigInt(minimumAmount)) {
      await baseswap.doRedeemVestedTokens(contractName, amount)
    }
  }

  await Promise.all([
    harvestFarm('BASESWAP_FARM_AXLUSDC_ETH', 1.0),
    harvestFarm('BASESWAP_FARM_BSWAP_ETH', 1.0),
    harvestFarm('BASESWAP_FARM_BSX_ETH', 1.0),
    harvestFarm('BASESWAP_FARM_OVN_USDC', 1.0),
  ])
  await delay(10000)()

  await Promise.all([
    (async () => {
      await poolToken('BASESWAP_COIN_BSX', 'BASESWAP_STAKER_BSX_WETH', 1.0)
    })(),
    redeemToken('BASESWAP_COIN_XBSX', 1.0),
  ])
  await delay(10000)()
}

const work = async () => {
  try {
    await Promise.all([
      bassExchangeStrategy(
        floatToBigInt(50.0),
      ),
    ])
  } catch (error: unknown) {
    logError(error as Error)
  }
}

const main = async () => {
  // await work()

  const timeoutMilliseconds = millisecondsUntilNextTimeframe(TIMEFRAME, new Date())
  if (E.isLeft(timeoutMilliseconds)) {
    logError(timeoutMilliseconds.left)
    return
  }
  setTimeout(() => {
    const intervalMilliseconds = toMs(TIMEFRAME)
    if (E.isLeft(intervalMilliseconds)) {
      logError(intervalMilliseconds.left)
      return
    }
    setInterval(async () => {
      await work()
    }, intervalMilliseconds.right)
    work().catch((error) => {
      logError(error as Error)
    })
  }, timeoutMilliseconds.right)
}

main().catch((error) => {
  logError(error as Error)
})
