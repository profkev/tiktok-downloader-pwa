import type { DownloadProgress, VideoQuality } from '@/types'

export class DownloadService {
  static async downloadFile(
    url: string, 
    filename: string, 
    onProgress?: (progress: DownloadProgress) => void
  ): Promise<void> {
    try {
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`)
      }

      const contentLength = response.headers.get('content-length')
      const total = contentLength ? parseInt(contentLength, 10) : 0
      let loaded = 0

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('Failed to get response reader')
      }

      const chunks: Uint8Array[] = []

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        chunks.push(value)
        loaded += value.length

        if (onProgress && total > 0) {
          onProgress({
            percentage: Math.round((loaded / total) * 100),
            loaded,
            total,
            status: 'downloading'
          })
        }
      }

      // Combine chunks
      const blob = new Blob(chunks)
      
      // Create download link
      const downloadUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = filename
      a.style.display = 'none'
      
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      
      // Clean up
      URL.revokeObjectURL(downloadUrl)

      if (onProgress) {
        onProgress({
          percentage: 100,
          loaded,
          total: loaded,
          status: 'completed'
        })
      }
    } catch (error) {
      if (onProgress) {
        onProgress({
          percentage: 0,
          loaded: 0,
          total: 0,
          status: 'error'
        })
      }
      throw error
    }
  }

  static generateFilename(title: string, author: string, quality: VideoQuality): string {
    const sanitizedTitle = title.replace(/[^\w\s-]/g, '').trim()
    const sanitizedAuthor = author.replace(/[^\w\s-]/g, '').trim()
    const extension = quality.format === 'mp3' ? 'mp3' : 'mp4'
    
    return `${sanitizedAuthor}_${sanitizedTitle}_${quality.quality}.${extension}`
  }

  static async downloadVideo(
    quality: VideoQuality,
    title: string,
    author: string,
    onProgress?: (progress: DownloadProgress) => void
  ): Promise<void> {
    const filename = this.generateFilename(title, author, quality)
    await this.downloadFile(quality.url, filename, onProgress)
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  static isDownloadSupported(): boolean {
    return 'serviceWorker' in navigator && 'Blob' in window && 'URL' in window
  }
}