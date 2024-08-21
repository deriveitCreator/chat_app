const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setUserSettings: (settings) => ipcRenderer.send('save-settings', settings),
  setOnTop: (inputVal) => ipcRenderer.send('set-on-top', inputVal),
  goToDonation: (inputVal) => ipcRenderer.send('go-to-donation', inputVal),
  googleSignIn: (url) => ipcRenderer.send('google-sign-in', url),
  setPage: (youtubeID) => ipcRenderer.send('set-page', youtubeID),
  startChatLoop: () => ipcRenderer.send('start-chat-loop'),
  stopChat: () => ipcRenderer.send('stop-chat'),
  onGotMessage: (callback) => ipcRenderer.on('got-message', (_event, obj) => callback(obj)),
  onGetChatText: (callback) => ipcRenderer.on('got-chat-Text', (_event, obj) => callback(obj)),
  setPageCallBack: (callback) => ipcRenderer.on('set-page-callback', (_event, success) => callback(success)),
  close: () => ipcRenderer.send('close')
})
