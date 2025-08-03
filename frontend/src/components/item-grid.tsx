"use client"
import { MoreVertical, Eye, Edit, ArrowRightLeft, MapPin, Package } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockItems = [
  {
    id: 1,
    name: "MacBook Pro",
    description: "13インチ MacBook Pro 2021年モデル",
    image: "/placeholder.svg?height=120&width=120",
    status: "in-use",
    category: "electronics",
    location: "living",
    tags: ["仕事", "個人"],
    owner: "田中太郎",
    borrower: null,
  },
  {
    id: 2,
    name: "キャンプテント",
    description: "4人用ファミリーテント",
    image: "/placeholder.svg?height=120&width=120",
    status: "borrowed",
    category: "outdoor",
    location: "garage",
    tags: ["キャンプ", "家族"],
    owner: "田中花子",
    borrower: "田中次郎",
  },
  {
    id: 3,
    name: "料理本セット",
    description: "和食・洋食・中華の基本料理本",
    image: "/placeholder.svg?height=120&width=120",
    status: "available",
    category: "books",
    location: "kitchen",
    tags: ["料理", "参考書"],
    owner: "共有",
    borrower: null,
  },
  {
    id: 4,
    name: "電動ドリル",
    description: "DIY用電動ドリルセット",
    image: "/placeholder.svg?height=120&width=120",
    status: "available",
    category: "tools",
    location: "garage",
    tags: ["DIY", "工具"],
    owner: "田中太郎",
    borrower: null,
  },
  {
    id: 5,
    name: "ヨガマット",
    description: "滑り止め付きヨガマット",
    image: "/placeholder.svg?height=120&width=120",
    status: "in-use",
    category: "sports",
    location: "bedroom",
    tags: ["運動", "健康"],
    owner: "田中花子",
    borrower: null,
  },
  {
    id: 6,
    name: "コーヒーメーカー",
    description: "全自動コーヒーメーカー",
    image: "/placeholder.svg?height=120&width=120",
    status: "available",
    category: "kitchen",
    location: "kitchen",
    tags: ["コーヒー", "家電"],
    owner: "共有",
    borrower: null,
  },
]

const statusColors = {
  available: "bg-emerald-100 text-emerald-800",
  "in-use": "bg-blue-100 text-blue-800",
  borrowed: "bg-orange-100 text-orange-800",
  discarded: "bg-gray-100 text-gray-800",
}

const statusLabels = {
  available: "利用可能",
  "in-use": "使用中",
  borrowed: "貸出中",
  discarded: "廃棄済み",
}

const locationLabels = {
  living: "リビング",
  kitchen: "キッチン",
  bedroom: "寝室",
  storage: "収納",
  garage: "ガレージ",
}

interface ItemGridProps {
  searchQuery: string
  selectedCategory: string
  selectedLocation: string
  onItemClick: (item: any) => void
}

export function ItemGrid({ searchQuery, selectedCategory, selectedLocation, onItemClick }: ItemGridProps) {
  const filteredItems = mockItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || item.location === selectedLocation

    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{mockItems.length}</div>
            <div className="text-sm text-gray-600">総アイテム数</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {mockItems.filter((item) => item.status === "available").length}
            </div>
            <div className="text-sm text-gray-600">利用可能</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {mockItems.filter((item) => item.status === "borrowed").length}
            </div>
            <div className="text-sm text-gray-600">貸出中</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {mockItems.filter((item) => item.status === "in-use").length}
            </div>
            <div className="text-sm text-gray-600">使用中</div>
          </CardContent>
        </Card>
      </div>

      {/* Items Grid */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">アイテム一覧 ({filteredItems.length}件)</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Image */}
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onClick={() => onItemClick(item)}
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4
                      className="font-medium text-gray-900 line-clamp-2 cursor-pointer hover:text-emerald-600"
                      onClick={() => onItemClick(item)}
                    >
                      {item.name}
                    </h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onItemClick(item)}>
                          <Eye className="h-4 w-4 mr-2" />
                          詳細表示
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          編集
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ArrowRightLeft className="h-4 w-4 mr-2" />
                          貸出管理
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

                  {/* Status and Location */}
                  <div className="flex items-center justify-between">
                    <Badge className={`text-xs ${statusColors[item.status]}`}>{statusLabels[item.status]}</Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {locationLabels[item.location]}
                    </div>
                  </div>

                  {/* Owner and Borrower */}
                  <div className="text-sm">
                    <div className="text-gray-600">所有者: {item.owner}</div>
                    {item.borrower && <div className="text-orange-600">借用者: {item.borrower}</div>}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{item.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">アイテムが見つかりません</h3>
          <p className="text-gray-600">検索条件を変更してお試しください</p>
        </div>
      )}
    </div>
  )
}
