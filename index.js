const { app, BrowserWindow, ipcMain, dialog, Menu, MenuItem} = require('electron/main');
const path = require('node:path')
const jsonfile = require('jsonfile')
const { shell } = require('electron');
const express = require('express');

var win = null;
const expressApp = express();
var server = null;

const JSON_LOC = "./static/settings.json";

function createWindow () {
  var settings = null;
  try{
    settings = jsonfile.readFileSync(JSON_LOC);
  }
  catch{
    closeFunc();
  }

  win = new BrowserWindow({
    minWidth: 300,
    resizable: true,
    frame: false,
    transparent: true,
    width: settings.width,
    height: settings.height,
    x: settings.x,
    y: settings.y,
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
    jsonfile.writeFile(JSON_LOC, settings, { spaces: 2 })
    .catch((err) => showError("Error when saving settings", err.message));
  });
  
  ipcMain.on('close', closeFunc);

  win.on('resized', saveNewSize);

  win.on('moved', saveNewPos);

  win.loadURL('http://127.0.0.1:3001/');

}

app.whenReady().then( async () => {

  try{
    expressApp.use(express.static('static'));    
    server = expressApp.listen(3001, createWindow);
  }
  catch (err) {
    console.log(err);
  }

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  
  let  menu = Menu.getApplicationMenu();
  menu.append(new MenuItem({
    label: 'Show Options',
    submenu: [{
      role: 'help',
      accelerator: 'Ctrl+O',
      click: () => win.webContents.send("show-options")
    }]
  }));
  menu.append(new MenuItem({
    label: 'Show Footer',
    submenu: [{
      role: 'help',
      accelerator: 'Ctrl+F',
      click: () => win.webContents.send("show-footer")
    }]
  }));
  Menu.setApplicationMenu(menu);

});

app.on('window-all-closed', closeFunc);

function saveNewSize(){
  let size = win.getSize();
  let newWidth = size[0];
  let newHeight = size[1];
  jsonfile.readFile(JSON_LOC)
  .then(settings => {
    settings.width = newWidth;
    settings.height = newHeight;
    jsonfile.writeFile(JSON_LOC, settings, { spaces: 2 })
    .catch((err) => showError("Error when saving new size", err.message));
  })
  .catch((err) => showError("Error when reading settings.json", err.message));
}

function saveNewPos(){
  let size = win.getPosition();
  let posX = size[0];
  let posY = size[1];
  jsonfile.readFile(JSON_LOC)
  .then(settings => {
    settings.x = posX;
    settings.y = posY;
    jsonfile.writeFile(JSON_LOC, settings, { spaces: 2 })
    .catch((err) => showError("Error when saving new position", err.message));
  })
  .catch((err) => showError("Error when reading settings.json", err.message));
}

async function showError(errTitle, errString){
  try{
    dialog.showErrorBox(errTitle, errString );
  }
  catch (err) {
    console.error(err);
  }
}

async function closeFunc(){
  if (server) server.close();
  app.quit();
}