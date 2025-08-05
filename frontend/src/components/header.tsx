"use client"

import { Bell, Search, Home, History, Tag, Users, Settings, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  sidebarCollapsed: boolean
  onSidebarToggle: () => void
}

function MobileSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navigation = [
    { name: "ホーム", href: "/", icon: Home, key: "home" },
    { name: "貸出履歴", href: "/borrow-history", icon: History, key: "borrow-history" },
    { name: "カテゴリ・タグ", href: "/categories", icon: Tag, key: "categories" },
    { name: "通知", href: "/notifications", icon: Bell, key: "notifications" },
    { name: "家族設定", href: "/family", icon: Users, key: "family" },
    { name: "設定", href: "/settings", icon: Settings, key: "settings" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Home className="h-5 w-5" /> {/* Using Home icon as a placeholder for Menu icon */}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">aredoko</h1>
            </div>
          </div>
          <nav className="flex-1 px-3 py-4">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        isActive(item.href) && "bg-emerald-500 hover:bg-emerald-600",
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function Header({ sidebarCollapsed, onSidebarToggle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* モバイル用サイドバートリガー */}
          <MobileSidebar />

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="モノを検索..." className="pl-10 bg-gray-50 border-gray-200" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-emerald-100 text-emerald-700">田</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
