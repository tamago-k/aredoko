"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ItemGrid } from "@/components/item-grid"
import { ItemModal } from "@/components/item-modal"
import { FilterBar } from "@/components/filter-bar"
import { Button } from "@/components/ui/button"
import { Plus, Camera } from "lucide-react"

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [quickRegisterMode, setQuickRegisterMode] = useState(false)

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleAddItem = (quickMode = false) => {
    setSelectedItem(null)
    setQuickRegisterMode(quickMode)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
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
          {/* クイック登録ボタン */}
          <Button
            onClick={() => handleAddItem(true)}
            className="h-12 px-4 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg flex items-center gap-2"
          >
            <Camera className="h-5 w-5" />
            <span className="hidden sm:inline">写真で登録</span>
          </Button>

          {/* 通常登録ボタン */}
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
