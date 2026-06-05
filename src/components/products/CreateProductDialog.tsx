'use client'

import { useState, useRef } from 'react'
import { Plus, X, ImagePlus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useCreateProduct, useUploadProductImage } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'

interface PreviewImage {
  file: File
  preview: string
}

export function CreateProductDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [qty, setQty] = useState('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [isActive, setIsActive] = useState(true)
  const [images, setImages] = useState<PreviewImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const createMutation = useCreateProduct()
  const uploadMutation = useUploadProductImage()
  const { data: categoriesData } = useCategories({ limit: 100 })
  const categories = categoriesData?.data ?? []

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages(prev => [...prev, ...previews])
    e.target.value = ''
  }

  const handleRemoveImage = (index: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleReset = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview))
    setImages([])
    setName('')
    setPrice('')
    setQty('')
    setCategoryId('')
    setIsActive(true)
  }

  const handleSubmit = async () => {
    if (!name.trim()) return alert('Please enter a product name')
    if (!categoryId) return alert('Please select a category')

    try {
      const response = await createMutation.mutateAsync({
        name,
        isActive,
        price: price ? parseFloat(price) : undefined,
        qty: qty ? parseInt(qty) : undefined,
        categoryId: parseInt(categoryId),
      })
      const product = response.data

      if (images.length > 0 && product?.id) {
        setIsUploading(true)
        await Promise.all(
          images.map(img =>
            uploadMutation.mutateAsync({ productId: product.id, file: img.file })
          )
        )
        setIsUploading(false)
      }

      setOpen(false)
      handleReset()
    } catch (err: any) {
      console.error('Error:', err?.response?.data)
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) handleReset() }}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Product
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">

          {/* Name */}
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              placeholder="Product name"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat: any) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price & Qty */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label>Price</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={qty}
                onChange={e => setQty(e.target.value)}
              />
            </div>
          </div>

          {/* Status */}
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select
              value={isActive ? 'active' : 'inactive'}
              onValueChange={(val) => setIsActive(val === 'active')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    Active
                  </span>
                </SelectItem>
                <SelectItem value="inactive">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                    Inactive
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="grid gap-2">
            <Label>Images</Label>
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {images.map((img, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <img
                      src={img.preview}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <Button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow hover:bg-red-600 transition p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              {images.length > 0 ? 'Add More Images' : 'Upload Image'}
            </Button>
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={createMutation.isPending || isUploading}>
            {createMutation.isPending ? 'Creating...' : isUploading ? 'Uploading...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}