declare interface Window {
  GM_xmlhttpRequest?: (options: {
    url: string
    responseType: 'json'
    anonymous?: boolean
    onerror(response: { responseText: string }): void
    onload(response: { response: unknown }): void
  }) => void
}
