import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now()

    await new Promise((resolve) => setTimeout(resolve, 50)) // Simulate network delay

    const responseTime = Date.now() - startTime

    const mockNetworkStatus = {
      chainId: 1329,
      latestBlock: "12345678",
      blockTime: "400ms",
      responseTime: `${responseTime}ms`,
      rpcEndpoint: "https://evm-rpc.sei-apis.com",
      explorer: "https://seitrace.com",
      status: "healthy",
      timestamp: new Date().toISOString(),
      metrics: {
        avgBlockTime: "400ms",
        tps: 2500,
        gasPrice: "0.1 gwei",
        networkLoad: "15.2%",
      },
    }

    return NextResponse.json(mockNetworkStatus)
  } catch (error) {
    console.error("Network status error:", error)
    return NextResponse.json(
      {
        chainId: 1329,
        status: "error",
        error: "Failed to fetch network status",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
