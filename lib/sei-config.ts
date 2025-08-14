export const seitraceAddr = (addr: string) => `https://seitrace.com/address/${addr}?chain=pacific-1`

export const seitraceTx = (tx: string) => `https://seitrace.com/tx/${tx}?chain=pacific-1`

export const getSeiNetworkParams = () => ({
  chainId: "0x531", // 1329 in hex
  chainName: "Sei Network",
  nativeCurrency: {
    name: "SEI",
    symbol: "SEI",
    decimals: 18,
  },
  rpcUrls: ["https://evm-rpc.sei-apis.com"],
  blockExplorerUrls: ["https://seitrace.com"],
})
