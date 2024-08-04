const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const jsonfile = require('jsonfile')

//On build add "frame: false, transparent: true" property
function createWindow () {
  const win = new BrowserWindow({
    width: 500,
    height: 700,
    minWidth: 300,
    resizable: true,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  });

  ipcMain.on('set-on-top', (event, inputVal) => {
    win.setAlwaysOnTop(inputVal);
  });

  ipcMain.on('save-settings', (event, settings) => {
    jsonfile.writeFile('./settings.json', settings, { spaces: 2 }, err => {
      if (err) console.error(err)
    });
  })

  ipcMain.on('close', (event) => {
    win.close();
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

app.on('window-all-closed', () => {
  app.quit()
});