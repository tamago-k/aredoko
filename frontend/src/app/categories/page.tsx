"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Tag, Grid3X3 } from "lucide-react"
import { cn } from "@/lib/utils"

const mockCategories = [
  { id: 1, name: "電子機器", color: "bg-blue-500", itemCount: 8 },
  { id: 2, name: "書籍", color: "bg-purple-500", itemCount: 12 },
  { id: 3, name: "アウトドア", color: "bg-green-500", itemCount: 5 },
  { id: 4, name: "工具", color: "bg-orange-500", itemCount: 7 },
  { id: 5, name: "キッチン", color: "bg-red-500", itemCount: 15 },
  { id: 6, name: "衣類", color: "bg-pink-500", itemCount: 3 },
]

const mockTags = [
  { id: 1, name: "仕事", itemCount: 6 },
  { id: 2, name: "個人", itemCount: 10 },
  { id: 3, name: "家族", itemCount: 8 },
  { id: 4, name: "キャンプ", itemCount: 4 },
  { id: 5, name: "料理", itemCount: 7 },
  { id: 6, name: "DIY", itemCount: 5 },
  { id: 7, name: "運動", itemCount: 3 },
  { id: 8, name: "健康", itemCount: 2 },
  { id: 9, name: "趣味", itemCount: 9 },
  { id: 10, name: "学習", itemCount: 4 },
]

const colorOptions = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-red-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-yellow-500",
  "bg-teal-500",
  "bg-gray-500",
]

export default function CategoriesPage() {
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isAddTagOpen, setIsAddTagOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryColor, setNewCategoryColor] = useState("bg-blue-500")
  const [newTagName, setNewTagName] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      // カテゴリ追加処理
      setNewCategoryName("")
      setNewCategoryColor("bg-blue-500")
      setIsAddCategoryOpen(false)
    }
  }

  const handleAddTag = () => {
    if (newTagName.trim()) {
      // タグ追加処理
      setNewTagName("")
      setIsAddTagOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className={cn("transition-all duration-300", "lg:pl-16", !sidebarCollapsed && "lg:pl-64")}>
        <Header sidebarCollapsed={sidebarCollapsed} onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">カテゴリ・タグ</h1>
            <p className="text-slate-600">アイテムの分類を管理できます</p>
          </div>

          {/* Categories Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Grid3X3 className="w-5 h-5" />
                カテゴリ ({mockCategories.length})
              </h2>
              <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-500 hover:bg-emerald-600">
                    <Plus className="w-4 h-4 mr-2" />
                    カテゴリ追加
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>新しいカテゴリを追加</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="category-name">カテゴリ名</Label>
                      <Input
                        id="category-name"
                        placeholder="例: スポーツ用品"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>カラー</Label>
                      <div className="grid grid-cols-5 gap-2 mt-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded-full ${color} ${
                              newCategoryColor === color ? "ring-2 ring-gray-400 ring-offset-2" : ""
                            }`}
                            onClick={() => setNewCategoryColor(color)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setIsAddCategoryOpen(false)}
                      >
                        キャンセル
                      </Button>
                      <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600" onClick={handleAddCategory}>
                        追加
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                        <div>
                          <h3 className="font-medium text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.itemCount}個のアイテム</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8 text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                タグ ({mockTags.length})
              </h2>
              <Dialog open={isAddTagOpen} onOpenChange={setIsAddTagOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    タグ追加
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>新しいタグを追加</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tag-name">タグ名</Label>
                      <Input
                        id="tag-name"
                        placeholder="例: 重要"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setIsAddTagOpen(false)}
                      >
                        キャンセル
                      </Button>
                      <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600" onClick={handleAddTag}>
                        追加
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {mockTags.map((tag) => (
                    <div key={tag.id} className="group relative">
                      <Badge variant="secondary" className="pr-8 hover:bg-gray-200 cursor-pointer">
                        {tag.name} ({tag.itemCount})
                      </Badge>
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="w-4 h-4 p-0 text-red-500 hover:text-red-700">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
