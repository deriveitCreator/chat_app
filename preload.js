const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  showOptions: (callback) => ipcRenderer.on('show-options', (_event) => callback()),
  showFooter: (callback) => ipcRenderer.on('show-footer',  (_event) => callback()),
  setUserSettings: (settings) => ipcRenderer.send('save-settings', settings),
  setOnTop: (inputVal) => ipcRenderer.send('set-on-top', inputVal),
  goToDonation: () => ipcRenderer.send('go-to-donation'),
  close: () => ipcRenderer.send('close')
})
