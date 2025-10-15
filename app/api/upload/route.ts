import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const documentType = formData.get("documentType") as string
    const studentNumber = formData.get("studentNumber") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Upload to Vercel Blob with organized path
    const blob = await put(`${studentNumber}/${documentType}/${file.name}`, file, {
      access: "public",
    })

    // Extract text from document (simplified - in production use OCR service)
    let extractedData = {}

    // For demo purposes, we'll simulate OCR extraction
    // In production, you'd use a service like Google Vision API, AWS Textract, etc.
    if (documentType === "id_document") {
      extractedData = {
        id_number: "9501015800080", // Simulated extraction
        first_name: "John",
        last_name: "Doe",
        date_of_birth: "1995-01-01",
      }
    } else if (documentType === "matric_certificate") {
      extractedData = {
        matric_year: 2023,
        subjects: [
          { name: "Mathematics", mark: 85 },
          { name: "Physical Sciences", mark: 78 },
          { name: "English", mark: 72 },
        ],
      }
    }

    return NextResponse.json({
      url: blob.url,
      filename: file.name,
      size: file.size,
      type: file.type,
      extractedData,
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
