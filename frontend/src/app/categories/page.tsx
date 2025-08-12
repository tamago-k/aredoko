"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // モーダル管理
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any | null>(null)
  const [categoryName, setCategoryName] = useState("")

  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<any | null>(null)
  const [tagName, setTagName] = useState("")

  const [locations, setLocations] = useState<any[]>([])
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false)
  const [editingLocation, setEditingLocation] = useState<any | null>(null)
  const [locationName, setLocationName] = useState("")

  const router = useRouter()
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  // --- 初期データ読み込み ---
  useEffect(() => {

    const token = localStorage.getItem("token")
    if (!token) {
      router.replace("/login")
      return
    }

    fetch(`${apiBaseUrl}/api/categories`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => setCategories(data))
      .catch(err => console.error("カテゴリ取得エラー:", err))

    fetch(`${apiBaseUrl}/api/tags`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => setTags(data))
      .catch(err => console.error("タグ取得エラー:", err))

      fetch(`${apiBaseUrl}/api/locations`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.json()
        })
        .then(data => setLocations(data))
        .catch(err => console.error("ロケーション取得エラー:", err))

  }, [])

  // --- カテゴリ処理 ---
  const openAddCategoryDialog = () => {
    setEditingCategory(null)
    setCategoryName("")
    setIsCategoryDialogOpen(true)
  }

  const openEditCategoryDialog = (category: any) => {
    setEditingCategory(category)
    setCategoryName(category.name)
    setIsCategoryDialogOpen(true)
  }

  const saveCategory = () => {
    if (!categoryName.trim()) return

    if (editingCategory) {
      fetch(`${apiBaseUrl}/api/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName })
      })
        .then(res => res.json())
        .then(updated => {
          setCategories(prev =>
            prev.map(c => c.id === updated.id ? updated : c)
          )
          setIsCategoryDialogOpen(false)
        })
    } else {
      fetch(`${apiBaseUrl}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName })
      })
        .then(res => res.json())
        .then(newCat => {
          setCategories(prev => [...prev, newCat])
          setIsCategoryDialogOpen(false)
        })
    }
  }

  const deleteCategory = (id: number) => {
    if (window.confirm("本当にこのカテゴリを削除しますか？")) {
      fetch(`${apiBaseUrl}/api/categories/${id}`, { method: "DELETE" })
        .then(() => {
          setCategories(prev => prev.filter(c => c.id !== id))
        })
    }
  }

  // --- タグ処理 ---
  const openAddTagDialog = () => {
    setEditingTag(null)
    setTagName("")
    setIsTagDialogOpen(true)
  }

  const openEditTagDialog = (tag: any) => {
    setEditingTag(tag)
    setTagName(tag.name)
    setIsTagDialogOpen(true)
  }

  const saveTag = () => {
    if (!tagName.trim()) return

    if (editingTag) {
      fetch(`${apiBaseUrl}/api/tags/${editingTag.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: tagName })
      })
        .then(res => res.json())
        .then(updated => {
          setTags(prev => prev.map(t => t.id === updated.id ? updated : t))
          setIsTagDialogOpen(false)
        })
    } else {
      fetch(`${apiBaseUrl}/api/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: tagName })
      })
        .then(res => res.json())
        .then(newTag => {
          setTags(prev => [...prev, newTag])
          setIsTagDialogOpen(false)
        })
    }
  }

  const deleteTag = (id: number) => {
    if (window.confirm("本当にこのタグを削除しますか？")) {
      fetch(`${apiBaseUrl}/api/tags/${id}`, { method: "DELETE" })
        .then(() => {
          setTags(prev => prev.filter(t => t.id !== id))
        })
    }
  }

  const openAddLocationDialog = () => {
    setEditingLocation(null)
    setLocationName("")
    setIsLocationDialogOpen(true)
  }

  const openEditLocationDialog = (location: any) => {
    setEditingLocation(location)
    setLocationName(location.name)
    setIsLocationDialogOpen(true)
  }

  const saveLocation = () => {
    if (!locationName.trim()) return

    if (editingLocation) {
      fetch(`${apiBaseUrl}/api/locations/${editingLocation.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: locationName }),
      })
        .then(res => res.json())
        .then(updated => {
          setLocations(prev =>
            prev.map(l => l.id === updated.id ? updated : l)
          )
          setIsLocationDialogOpen(false)
        })
    } else {
      fetch(`${apiBaseUrl}/api/locations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: locationName }),
      })
        .then(res => res.json())
        .then(newLocation => {
          setLocations(prev => [...prev, newLocation])
          setIsLocationDialogOpen(false)
        })
    }
  }

  const deleteLocation = (id: number) => {
    if (window.confirm("本当にこの保管場所を削除しますか？")) {
      fetch(`${apiBaseUrl}/api/locations/${id}`, { method: "DELETE" })
        .then(() => {
          setLocations(prev => prev.filter(l => l.id !== id))
        })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div
        className={cn("transition-all duration-300", "lg:pl-16", !sidebarCollapsed && "lg:pl-64")}
      >
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
                カテゴリ ({categories.length})
              </h2>
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-emerald-500 hover:bg-emerald-600"
                    onClick={openAddCategoryDialog}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    カテゴリ追加
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? "カテゴリ編集" : "新しいカテゴリを追加"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="category-name">カテゴリ名</Label>
                      <Input
                        id="category-name"
                        placeholder="例: スポーツ用品"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setIsCategoryDialogOpen(false)}
                      >
                        キャンセル
                      </Button>
                      <Button
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                        onClick={saveCategory}
                      >
                        {editingCategory ? "保存" : "追加"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full ${category.color}`}
                        ></div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {category.itemCount}個のアイテム
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => openEditCategoryDialog(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 text-red-500 hover:text-red-700"
                          onClick={() => deleteCategory(category.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Locations Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Grid3X3 className="w-5 h-5" />
                保管場所 ({locations.length})
              </h2>
              <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-emerald-500 hover:bg-emerald-600"
                    onClick={openAddLocationDialog}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    保管場所追加
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{editingLocation ? "保管場所編集" : "新しい保管場所を追加"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="location-name">保管場所名</Label>
                      <Input
                        id="location-name"
                        placeholder="例: リビング"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setIsLocationDialogOpen(false)}
                      >
                        キャンセル
                      </Button>
                      <Button
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                        onClick={saveLocation}
                      >
                        {editingLocation ? "保存" : "追加"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.map((location) => (
                <Card
                  key={location.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${location.color}`}></div>
                        <div>
                          <h3 className="font-medium text-gray-900">{location.name}</h3>
                          <p className="text-sm text-gray-600">
                            {location.itemCount}個のアイテム
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => openEditLocationDialog(location)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 text-red-500 hover:text-red-700"
                          onClick={() => deleteLocation(location.id)}
                        >
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
                タグ ({tags.length})
              </h2>
              <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-transparent" onClick={openAddTagDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    タグ追加
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{editingTag ? "タグ編集" : "新しいタグを追加"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tag-name">タグ名</Label>
                      <Input
                        id="tag-name"
                        placeholder="例: 重要"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setIsTagDialogOpen(false)}
                      >
                        キャンセル
                      </Button>
                      <Button
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                        onClick={saveTag}
                      >
                        {editingTag ? "保存" : "追加"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <div key={tag.id} className="group relative">
                      <Badge
                        variant="secondary"
                        className="pr-8 hover:bg-gray-200 cursor-pointer"
                      >
                        {tag.name} ({tag.itemCount})
                      </Badge>
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-4 h-4 p-0 text-red-500 hover:text-red-700"
                          onClick={() => deleteTag(tag.id)}
                        >
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
