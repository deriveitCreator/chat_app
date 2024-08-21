const { app, BrowserWindow, ipcMain } = require('electron/main');
const { dialog } = require('electron');
const path = require('node:path')
const jsonfile = require('jsonfile')
const { shell } = require('electron');
const { createServer } = require('node:http');
const url = require('url');
const puppeteer = require('puppeteer-core');
const {executablePath} = require('puppeteer');

var win = null;
var server = null;
var backendURL = "https://django-apps.vercel.app/uchat_backend";
var puppeteerBrowser = null;
var puppeteerPage = null;
var keepGettingTexts = false;

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

  ipcMain.on('go-to-donation', (event, inputVal) => {
    shell.openExternal("https://www.paypal.com/paypalme/uzair0845?country.x=CA&locale.x=en_US");
  });

  ipcMain.on('save-settings', (event, settings) => {
    jsonfile.writeFile('./settings.json', settings, { spaces: 2 }, err => {
      if (err) console.error(err)
    });
  });

  ipcMain.on('google-sign-in', async (event, url) => {
    shell.openExternal(url);
  })

  ipcMain.on('set-page', async (event, youtubeId) => {
    try{
      if (!puppeteerPage) puppeteerPage = await puppeteerBrowser.newPage();
      await puppeteerPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36')
      await puppeteerPage.goto('https://www.youtube.com/live_chat?v='+youtubeId, {waitUntil: "domcontentloaded"});
      let chatTextEl = await puppeteerPage.$('#chat #items .yt-live-chat-item-list-renderer:last-child');
      if (chatTextEl) win.webContents.send('set-page-callback', true);
      else win.webContents.send('set-page-callback', false);
    }
    catch { win.webContents.send('set-page-callback', false); }
  });

  ipcMain.on('start-chat-loop', async (event) => {
    try{
      let chatTextEl = await puppeteerPage.$('#chat #items .yt-live-chat-item-list-renderer:last-child');
      keepGettingTexts = true;
      setTimeout(()=>{getNextText(puppeteerPage, chatTextEl)}, 200);
    }
    catch (err) {
      console.log(err);
    }
  })

  ipcMain.on('stop-chat', (event) => {
    keepGettingTexts = false;
  });
  
  ipcMain.on('close', async (event) => {
    win.close();
  });

  win.loadFile('index.html');

}

app.whenReady().then( async () => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  
  try{
    server = createServer((req, res) => handleReqs(req, res));
    server.listen(3001, '127.0.0.1', () => {
      console.log(`Server running at http://127.0.0.1:3001/`);
    });
  }
  catch (err) {
    dialog.showErrorBox("Error when starting server...", err);
    win.close();
  }

  try{
    puppeteerBrowser = await puppeteer.launch({
      executablePath: executablePath(),
      //headless: false,
    });
    puppeteerPage = await puppeteerBrowser.newPage();
  }
  catch (err) {
    dialog.showErrorBox("Error with using puppeteer...", err);
    win.close();
  }

});

app.on('window-all-closed', async () => {
  if (puppeteerBrowser) await puppeteerBrowser.close();
  server.close();
  app.quit();
});

function handleReqs(req, res){
  if(req.url.indexOf('favicon.ico') === -1){
    let q = url.parse(req.url, true).query;
    fetch(backendURL + "/get_token", {
      method: "POST",
      body: JSON.stringify({
        "code": q.code,
        "state": q.state
      }),
      headers: {"Content-Type": "application/json"},
      credentials: 'include'
    })
    .then(result => {
      if (!result.ok) throw new Error("Something went wrong!");
      return result.json();
    })
    .then(result => {
      win.webContents.send('got-message', result);
      res.writeHead(200, {'Content-Type':'text/plain'});
      res.write('Successfully signed in!');
      res.end();
    })
    .catch(err => {
      res.writeHead(500, {'Content-Type':'text/plain'});
      res.write('There was en error!\n' + err.toString());
      res.end();
    });
  }
  else {
    res.writeHead(200, {'Content-Type':'text/x-icon'});
    res.end();
  }
}

async function getNextText(page, chatTextEl){
  let nextEl = await page.evaluateHandle(el => el.nextSibling, chatTextEl);
  let nextText = await nextEl.evaluate(getTextFromEl);
  if (nextText) win.webContents.send('got-chat-Text', nextText);
  else nextEl = chatTextEl;
  if (keepGettingTexts) setTimeout(()=>{getNextText(page, nextEl)}, 200);
}

function getTextFromEl(el){
  if (el) {
    try{
      return {
        time: el.querySelector('#content #timestamp').innerText,
        author: el.querySelector('#content #author-name').innerText,
        chatBadges: el.querySelector('#content #chat-badges').innerHTML,
        message: el.querySelector('#content #message').innerHTML,
      };
    }
    catch{
      return "ERROR";
    }
  }
  else return null;
}
