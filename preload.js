const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setUserSettings: (settings) => ipcRenderer.send('save-settings', settings),
  setOnTop: (inputVal) => ipcRenderer.send('set-on-top', inputVal),
  goToDonation: () => ipcRenderer.send('go-to-donation'),
  close: () => ipcRenderer.send('close')
})
