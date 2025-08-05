"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, History, Tag, Bell, Users, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "ホーム", href: "/", icon: Home, key: "home" },
  { name: "貸出履歴", href: "/borrows", icon: History, key: "borrows" },
  { name: "カテゴリ・タグ", href: "/categories", icon: Tag, key: "categories" },
  { name: "通知", href: "/notifications", icon: Bell, key: "notifications" },
  { name: "家族設定", href: "/family", icon: Users, key: "family" },
  { name: "設定", href: "/settings", icon: Settings, key: "settings" },
]

interface SidebarProps {
  currentPage?: string
  collapsed: boolean
  onToggle: () => void
}

// デスクトップ用サイドバー
function DesktopSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <div
      className={cn(
        "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:bg-white lg:border-r lg:border-gray-200 lg:transition-all lg:duration-300",
        collapsed ? "lg:w-16" : "lg:w-64",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">aredoko</h1>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.key}>
                <Link href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive(item.href) && "bg-emerald-500 hover:bg-emerald-600",
                      collapsed && "px-2",
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                    {!collapsed && <span>{item.name}</span>}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return <DesktopSidebar collapsed={collapsed} onToggle={onToggle} />
}
