export class TikTokParser {
  private static readonly TIKTOK_DOMAINS = [
    'tiktok.com',
    'www.tiktok.com',
    'm.tiktok.com',
    'vm.tiktok.com'
  ]

  static isValidTikTokUrl(url: string): boolean {
    try {
      const urlObj = new URL(url)
      return this.TIKTOK_DOMAINS.some(domain => urlObj.hostname.includes(domain))
    } catch {
      return false
    }
  }

  static extractVideoId(url: string): string | null {
    try {
      const urlObj = new URL(url)
      
      // Handle vm.tiktok.com short links
      if (urlObj.hostname.includes('vm.tiktok.com')) {
        return urlObj.pathname.slice(1) // Remove leading slash
      }

      // Handle standard tiktok.com links
      const pathParts = urlObj.pathname.split('/')
      const videoIndex = pathParts.findIndex(part => part === 'video')
      
      if (videoIndex !== -1 && pathParts[videoIndex + 1]) {
        return pathParts[videoIndex + 1]
      }

      // Handle @username/video/id format
      const userIndex = pathParts.findIndex(part => part.startsWith('@'))
      if (userIndex !== -1) {
        const videoIdx = pathParts.findIndex((part, idx) => idx > userIndex && part === 'video')
        if (videoIdx !== -1 && pathParts[videoIdx + 1]) {
          return pathParts[videoIdx + 1]
        }
      }

      return null
    } catch {
      return null
    }
  }

  static normalizeUrl(url: string): string {
    if (!url.startsWith('http')) {
      url = 'https://' + url
    }
    return url
  }

  static validateAndParse(url: string): { isValid: boolean; videoId: string | null; normalizedUrl: string } {
    const normalizedUrl = this.normalizeUrl(url)
    const isValid = this.isValidTikTokUrl(normalizedUrl)
    const videoId = isValid ? this.extractVideoId(normalizedUrl) : null

    return {
      isValid,
      videoId,
      normalizedUrl
    }
  }
}