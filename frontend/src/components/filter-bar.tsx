"use client"

import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface FilterBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedLocation: string
  setSelectedLocation: (location: string) => void
}

export function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="アイテム名、タグ、説明で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="カテゴリ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全カテゴリ</SelectItem>
              <SelectItem value="electronics">電子機器</SelectItem>
              <SelectItem value="books">書籍</SelectItem>
              <SelectItem value="outdoor">アウトドア</SelectItem>
              <SelectItem value="tools">工具</SelectItem>
              <SelectItem value="kitchen">キッチン</SelectItem>
              <SelectItem value="clothing">衣類</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="場所" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全場所</SelectItem>
              <SelectItem value="living">リビング</SelectItem>
              <SelectItem value="kitchen">キッチン</SelectItem>
              <SelectItem value="bedroom">寝室</SelectItem>
              <SelectItem value="storage">収納</SelectItem>
              <SelectItem value="garage">ガレージ</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
