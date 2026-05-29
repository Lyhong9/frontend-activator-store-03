'use client'

import { useState, useRef } from 'react'
import { Plus, X, ImagePlus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useCreateCategory, useUploadCategoryImage } from '@/hooks/useCategories'

interface PreviewImage {
  file: File
  preview: string
}

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [images, setImages] = useState<PreviewImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const createMutation = useCreateCategory()
  const uploadMutation = useUploadCategoryImage()

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
  }

const handleSubmit = async () => {
  if (!name.trim()) {
    alert('Please enter a category name')
    return
  }

  try {
    // ✅ Response is { message, data: category } — extract data
    const response = await createMutation.mutateAsync({ name })
    const category = response.data  // ← this is the fix

    if (images.length > 0 && category?.id) {
      setIsUploading(true)
      await Promise.all(
        images.map(img =>
          uploadMutation.mutateAsync({ categoryId: category.id, file: img.file })
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
          Create Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">

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
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={createMutation.isPending || isUploading}
          >
            {createMutation.isPending
              ? 'Creating...'
              : isUploading
              ? 'Uploading...'
              : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}