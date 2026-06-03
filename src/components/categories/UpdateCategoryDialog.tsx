'use client'

import { useState, useRef, useEffect } from 'react'
import { X, ImagePlus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useUpdateCategory, useUploadCategoryImage, useDeleteCategoryImage } from '@/hooks/useCategories'
import type { ICategory } from '@/types/category'

interface PreviewImage {
  file: File
  preview: string
}

interface Props {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  category: ICategory
}

export function UpdateCategoryDialog({ isOpen, setIsOpen, category }: Props) {
  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [existingImages, setExistingImages] = useState(category.categoryImages || [])
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([])
  const [newImages, setNewImages] = useState<PreviewImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateMutation = useUpdateCategory()
  const uploadMutation = useUploadCategoryImage()
  const deleteImageMutation = useDeleteCategoryImage()

  useEffect(() => {
    if (isOpen) {
      setName(category.name)
      setIsActive(category.isActive ?? true)  // ✅ pre-fill status
      setDeletedImageIds([])
      setNewImages([])
    }
  }, [isOpen])

  useEffect(() => {
    setExistingImages(category.categoryImages || [])
  }, [category.categoryImages])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setNewImages(prev => [...prev, ...previews])
    e.target.value = ''
  }

  const handleRemoveNewImage = (index: number) => {
    setNewImages(prev => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleMarkDeleteExistingImage = (imageId: string) => {
    setDeletedImageIds(prev => [...prev, imageId])
  }

  const handleRestoreImage = (imageId: string) => {
    setDeletedImageIds(prev => prev.filter(id => id !== imageId))
  }

  const handleReset = () => {
    newImages.forEach(img => URL.revokeObjectURL(img.preview))
    setNewImages([])
    setDeletedImageIds([])
    setName('')
    setIsActive(true)
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Please enter a category name')
      return
    }

    try {
      // Step 1: update name + status
      await updateMutation.mutateAsync({
        categoryId: category.id,
        request: { name, isActive },  // ✅ send isActive
      })

      // Step 2: delete marked images
      if (deletedImageIds.length > 0) {
        await Promise.all(
          deletedImageIds.map(id => deleteImageMutation.mutateAsync(id))
        )
      }

      // Step 3: upload new images
      if (newImages.length > 0) {
        setIsUploading(true)
        await Promise.all(
          newImages.map(img =>
            uploadMutation.mutateAsync({ categoryId: category.id, file: img.file })
          )
        )
        setIsUploading(false)
      }

      setIsOpen(false)
      handleReset()

    } catch (err: any) {
      console.error('Error:', err?.response?.data)
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(val) => { setIsOpen(val); if (!val) handleReset() }}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">

          {/* Image */}
          <div className="grid gap-2">
            <Label>Image</Label>

            <div className="flex flex-wrap gap-2">

              {/* Existing Images */}
              {existingImages.map((img) => {
                const isMarkedForDelete = deletedImageIds.includes(img.id)
                return (
                  <div key={img.id} className="relative w-20 h-20">
                    <img
                      src={img.imageUrl}
                      alt="category"
                      className={`w-20 h-20 object-cover rounded-md border transition-all ${
                        isMarkedForDelete ? 'opacity-30 grayscale' : ''
                      }`}
                    />
                    {!isMarkedForDelete ? (
                      <Button
                        onClick={() => handleMarkDeleteExistingImage(img.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow hover:bg-red-600 transition p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleRestoreImage(img.id)}
                        className="absolute -top-2 -right-2 bg-gray-400 text-white rounded-full w-5 h-5 flex items-center justify-center shadow hover:bg-gray-500 transition p-0"
                        title="Undo"
                      >
                        ↩
                      </Button>
                    )}
                  </div>
                )
              })}

              {/* New Image Previews */}
              {newImages.map((img, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={img.preview}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <Button
                    onClick={() => handleRemoveNewImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow hover:bg-red-600 transition p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}

            </div>

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
              {newImages.length > 0 ? 'Add More Images' : 'Change Image'}
            </Button>
          </div>

          {/* Name */}
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              placeholder="Category name"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
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

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={updateMutation.isPending || isUploading}
          >
            {updateMutation.isPending
              ? 'Updating...'
              : isUploading
              ? 'Uploading...'
              : 'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}