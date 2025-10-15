"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, CheckCircle, X, Loader2 } from "lucide-react"

interface DocumentUploadProps {
  documentType: string
  title: string
  description: string
  studentNumber: string
  onUploadComplete?: (data: any) => void
  acceptedFileTypes?: string
}

export function DocumentUpload({
  documentType,
  title,
  description,
  studentNumber,
  onUploadComplete,
  acceptedFileTypes = ".pdf,.jpg,.jpeg,.png",
}: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [error, setError] = useState("")
  const [uploadedUrl, setUploadedUrl] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB")
        return
      }
      setFile(selectedFile)
      setError("")
      setUploaded(false)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("documentType", documentType)
      formData.append("studentNumber", studentNumber)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      setUploadedUrl(data.url)
      setUploaded(true)

      // Call the callback with extracted data
      if (onUploadComplete && data.extractedData) {
        onUploadComplete(data.extractedData)
      }
    } catch (err) {
      setError("Failed to upload document. Please try again.")
      console.error("[v0] Upload error:", err)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    if (uploadedUrl) {
      try {
        await fetch("/api/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: uploadedUrl }),
        })
      } catch (err) {
        console.error("[v0] Delete error:", err)
      }
    }
    setFile(null)
    setUploaded(false)
    setUploadedUrl("")
    setError("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!uploaded ? (
          <>
            <div className="flex items-center gap-4">
              <Label htmlFor={`file-${documentType}`} className="flex-1 cursor-pointer">
                <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-foreground-muted" />
                  <p className="text-sm text-foreground-muted">
                    {file ? file.name : "Click to select file or drag and drop"}
                  </p>
                  <p className="text-xs text-foreground-subtle mt-1">Accepted: {acceptedFileTypes} (Max 5MB)</p>
                </div>
                <input
                  id={`file-${documentType}`}
                  type="file"
                  accept={acceptedFileTypes}
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </Label>
            </div>

            {file && !uploaded && (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm flex-1">{file.name}</span>
                <Button size="sm" onClick={handleUpload} disabled={uploading}>
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload"
                  )}
                </Button>
                <Button size="sm" variant="ghost" onClick={handleRemove} disabled={uploading}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <Alert className="bg-success-bg border-success">
            <CheckCircle className="h-4 w-4 text-success" />
            <AlertDescription className="flex items-center justify-between">
              <span className="text-success">Document uploaded successfully!</span>
              <Button size="sm" variant="ghost" onClick={handleRemove} className="text-success hover:text-success">
                Remove
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
