const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setUserSettings: (settings) => ipcRenderer.send('save-settings', settings),
  setOnTop: (inputVal) => ipcRenderer.send('set-on-top', inputVal),
  close: () => ipcRenderer.send('close')
})