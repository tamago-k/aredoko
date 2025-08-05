"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ItemGrid } from "@/components/item-grid"
import { ItemModal } from "@/components/item-modal"
import { FilterBar } from "@/components/filter-bar"
import { Button } from "@/components/ui/button"
import { Plus, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [quickRegisterMode, setQuickRegisterMode] = useState(false)
  const [items, setItems] = useState([]) // ← 追加
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.replace("/login")
      return
    }

    // アイテム取得API呼び出し
    fetch(`${apiBaseUrl}/api/items`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("アイテムの取得に失敗しました")
        return res.json()
      })
      .then(data => {
        setItems(data)
      })
      .catch(err => {
        alert(err.message)
        router.replace("/login")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [router, apiBaseUrl])

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleAddItem = (quickMode = false) => {
    setSelectedItem(null)
    setQuickRegisterMode(quickMode)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">読み込み中...</div>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div
        className={cn(
          "transition-all duration-300",
          "lg:pl-16", // デフォルトは閉じた状態
          !sidebarCollapsed && "lg:pl-64", // 開いた時は64
        )}
      >
        <Header sidebarCollapsed={sidebarCollapsed} onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">すべてのモノ</h1>
            <p className="text-slate-600">家族のモノを一覧で確認できます</p>
          </div>

          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />

          <ItemGrid
            items={items}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            onItemClick={handleItemClick}
          />
        </main>
      </div>

      {/* フローティング追加ボタン */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => handleAddItem(true)}
            className="h-12 px-4 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg flex items-center gap-2"
          >
            <Camera className="h-5 w-5" />
            <span className="hidden sm:inline">写真で登録</span>
          </Button>
          <Button
            onClick={() => handleAddItem(false)}
            variant="outline"
            className="h-12 w-12 rounded-full bg-white shadow-lg"
            size="icon"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        quickMode={quickRegisterMode}
      />
    </div>
  )
}
