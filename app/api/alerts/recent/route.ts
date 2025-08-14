import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    const mockAlerts = [
      {
        id: "alert_0x1234_1",
        type: "large_transfer",
        severity: "high",
        title: "Large Transfer Detected",
        description: "Large token transfer involving 0x742d35...590c6C87",
        address: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
        transactionHash: "0x1234567890abcdef1234567890abcdef12345678",
        blockNumber: "12345678",
        detectedAt: new Date(Date.now() - 300000).toISOString(),
        deliveredAt: new Date(Date.now() - 299200).toISOString(),
        latency: 800,
        evidence: {
          contract: "0xA0b86a33E6441e8e421c7c7c4b8b8b8b8b8b8b8b",
          topics: ["0x1234", "0x5678"],
          blockHash: "0xabcdef1234567890abcdef1234567890abcdef12",
        },
      },
      {
        id: "alert_0x5678_2",
        type: "dex_interaction",
        severity: "medium",
        title: "DEX Interaction Alert",
        description: "DEX swap activity detected on 0x8ba1f1...22C177e9",
        address: "0x8ba1f109551bD432803012645Hac136c22C177e9",
        transactionHash: "0x5678901234bcdef15678901234bcdef156789012",
        blockNumber: "12345677",
        detectedAt: new Date(Date.now() - 600000).toISOString(),
        deliveredAt: new Date(Date.now() - 599400).toISOString(),
        latency: 600,
        evidence: {
          contract: "0xB1c97a44F7552f9f532d8d8d5c9c9c9c9c9c9c9c",
          topics: ["0x2345", "0x6789"],
          blockHash: "0xbcdef15678901234bcdef15678901234bcdef123",
        },
      },
      {
        id: "alert_0x9012_3",
        type: "unusual_activity",
        severity: "low",
        title: "Unusual Activity Pattern",
        description: "Unusual transaction pattern detected for 0x1f9840...4201F984",
        address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        transactionHash: "0x9012345678cdef129012345678cdef1290123456",
        blockNumber: "12345676",
        detectedAt: new Date(Date.now() - 900000).toISOString(),
        deliveredAt: new Date(Date.now() - 899100).toISOString(),
        latency: 900,
        evidence: {
          contract: "0xC2d08b55G8663g0g643e9e9e6d0d0d0d0d0d0d0d",
          topics: ["0x3456", "0x7890"],
          blockHash: "0xcdef129012345678cdef129012345678cdef1234",
        },
      },
    ]

    const response = {
      alerts: mockAlerts.slice(0, limit),
      metadata: {
        total: mockAlerts.length,
        avgLatency: 767,
        lastUpdated: new Date().toISOString(),
        monitoredBlocks: 1000,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Alerts API error:", error)
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 })
  }
}
