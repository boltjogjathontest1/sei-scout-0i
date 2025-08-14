"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ExternalLink, Wallet } from "lucide-react"
import { seitraceAddr } from "@/lib/sei-config"

interface SampleWallet {
  address: string
  label: string
  balance: string
  tx24h: number
  dexTrades: number
  type: "whale" | "defi" | "nft" | "trader"
}

const sampleWallets: SampleWallet[] = [
  {
    address: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
    label: "DeFi Whale",
    balance: "847.2K SEI",
    tx24h: 23,
    dexTrades: 8,
    type: "whale",
  },
  {
    address: "0x8ba1f109551bD432803012645Hac136c22C177e9",
    label: "Active Trader",
    balance: "156.7K SEI",
    tx24h: 45,
    dexTrades: 32,
    type: "trader",
  },
  {
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    label: "DeFi Power User",
    balance: "298.4K SEI",
    tx24h: 18,
    dexTrades: 12,
    type: "defi",
  },
  {
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    label: "NFT Collector",
    balance: "89.3K SEI",
    tx24h: 7,
    dexTrades: 2,
    type: "nft",
  },
  {
    address: "0xA0b86a33E6441E6C7D3E4C2A4b5c5D3E6F7G8H9I",
    label: "Yield Farmer",
    balance: "423.1K SEI",
    tx24h: 31,
    dexTrades: 15,
    type: "defi",
  },
]

interface SampleWalletsDropdownProps {
  onSelectWallet: (wallet: SampleWallet) => void
  selectedWallet?: SampleWallet
}

export function SampleWalletsDropdown({ onSelectWallet, selectedWallet }: SampleWalletsDropdownProps) {
  const getTypeColor = (type: SampleWallet["type"]) => {
    switch (type) {
      case "whale":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "trader":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "defi":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "nft":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-[#22D3EE] text-[#22D3EE] hover:bg-[#22D3EE]/10 bg-transparent">
          <Wallet className="w-4 h-4 mr-2" />
          {selectedWallet ? `${selectedWallet.label}` : "Sample Wallets"}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-[#1A202C] border-[#2D3748]">
        <DropdownMenuLabel className="text-[#22D3EE]">Demo Wallets for Testing</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#2D3748]" />
        {sampleWallets.map((wallet) => (
          <DropdownMenuItem
            key={wallet.address}
            className="p-4 cursor-pointer hover:bg-[#2D3748] focus:bg-[#2D3748]"
            onClick={() => onSelectWallet(wallet)}
          >
            <div className="flex flex-col w-full space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-[#F7FAFC]">{wallet.label}</span>
                  <Badge className={getTypeColor(wallet.type)}>{wallet.type}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-[#22D3EE]/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(seitraceAddr(wallet.address), "_blank")
                  }}
                >
                  <ExternalLink className="w-3 h-3 text-[#22D3EE]" />
                </Button>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
              </div>
              <div className="flex justify-between text-xs text-gray-300">
                <span>Balance: {wallet.balance}</span>
                <span>
                  24h: {wallet.tx24h} tx, {wallet.dexTrades} DEX
                </span>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
