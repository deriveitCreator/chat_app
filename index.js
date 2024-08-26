const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path')
const jsonfile = require('jsonfile')
const { shell } = require('electron');
const express = require('express')

var win = null;
const expressApp = express();
var server = null;

function createWindow () {
  win = new BrowserWindow({
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

  ipcMain.on('go-to-donation', (event) => {
    shell.openExternal("https://www.paypal.com/paypalme/uzair0845?country.x=CA&locale.x=en_US");
  });

  ipcMain.on('save-settings', (event, settings) => {
    jsonfile.writeFile('./settings.json', settings, { spaces: 2 }, err => {
      if (err) console.error(err)
    });
  });
  
  ipcMain.on('close', async (event) => {
    win.close();
  });

  win.loadURL('http://127.0.0.1:3001/');

}

app.whenReady().then( async () => {

  try{
    expressApp.use(express.static('public'));    
    server = expressApp.listen(3001, createWindow);
  }
  catch (err) {
    console.log(err);
  }

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

});

app.on('window-all-closed', async () => {
  server.close();
  app.quit();
});