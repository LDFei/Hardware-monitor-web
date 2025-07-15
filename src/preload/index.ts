import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import ipcRenderer = Electron.ipcRenderer
// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electron', {
      electronAPI: electronAPI,
      queryCpuName: () => ipcRenderer.invoke('queryCpuName')
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = {
    electronAPI: electronAPI,
    queryCpuName: () => ipcRenderer.invoke('queryCpuName')
  }
  // @ts-ignore (define in dts)
  window.api = api

}


