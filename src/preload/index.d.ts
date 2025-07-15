import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: unknown
    api: unknown
  }
}
