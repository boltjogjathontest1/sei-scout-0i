import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const timeframe = searchParams.get("timeframe") || "24h"

    const mockTopWallets = [
      {
        address: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
        label: "DeFi Whale",
        pnl: {
          absolute: 156780,
          percentage: 23.4,
          period: timeframe,
        },
        sharpeRatio: 2.8,
        volume: 2340000,
        winRate: 78.5,
        trades: 156,
        avgTradeSize: 15000,
        topTokens: ["SEI", "USDC", "WETH"],
        riskScore: 3.2,
        evidence: {
          profitableTrades: ["0x1234...abcd", "0x5678...efgh", "0x9012...ijkl"],
          totalSwaps: 45,
        },
      },
      {
        address: "0x8ba1f109551bD432803012645Hac136c22C177e9",
        label: "Active Trader",
        pnl: {
          absolute: 89340,
          percentage: 18.7,
          period: timeframe,
        },
        sharpeRatio: 2.1,
        volume: 1890000,
        winRate: 72.3,
        trades: 234,
        avgTradeSize: 8070,
        topTokens: ["SEI", "USDC", "ATOM"],
        riskScore: 4.1,
        evidence: {
          profitableTrades: ["0x2345...bcde", "0x6789...fghi", "0x0123...jklm"],
          totalSwaps: 67,
        },
      },
      {
        address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        label: "DeFi Power User",
        pnl: {
          absolute: 67890,
          percentage: 15.2,
          period: timeframe,
        },
        sharpeRatio: 1.9,
        volume: 1560000,
        winRate: 69.8,
        trades: 189,
        avgTradeSize: 8254,
        topTokens: ["SEI", "USDC", "OSMO"],
        riskScore: 3.8,
        evidence: {
          profitableTrades: ["0x3456...cdef", "0x7890...ghij", "0x1234...klmn"],
          totalSwaps: 52,
        },
      },
    ]

    const mockMarketInsights = {
      totalVolume: 675000,
      activeTraders: 1247,
      topPairs: [
        { pair: "SEI/USDC", volume: 4500000, change24h: 12.3 },
        { pair: "SEI/WETH", volume: 2100000, change24h: -3.4 },
        { pair: "USDC/ATOM", volume: 1800000, change24h: 8.7 },
      ],
      trends: [
        "Increased DeFi activity on Sei network",
        "Growing adoption of yield farming strategies",
        "Rising interest in cross-chain assets",
      ],
    }

    const mirrorOpportunities = mockTopWallets.slice(0, limit).map((wallet) => ({
      ...wallet,
      mirrorTradeUrl: `https://dragonswap.app/swap?inputCurrency=SEI&outputCurrency=USDC&exactAmount=${wallet.avgTradeSize}`,
      confidence: Math.min(95, wallet.winRate + wallet.sharpeRatio * 5),
      estimatedGas: "0.001 SEI",
      slippage: "0.5%",
    }))

    const response = {
      topWallets: mockTopWallets.slice(0, limit),
      mirrorOpportunities,
      marketInsights: mockMarketInsights,
      metadata: {
        timeframe,
        dataPoints: 164,
        lastUpdated: new Date().toISOString(),
        network: "Sei EVM (1329)",
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Opportunities API error:", error)
    return NextResponse.json({ error: "Failed to fetch opportunities" }, { status: 500 })
  }
}
