const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const electron = require('electron');
const ipc = electron.ipcMain

ipc.on("test", (event) => {
  event.sender.send("test-back", "hello")
})

let win;
function createWindow() {
  win = new BrowserWindow({
     width: 1200, 
     height: 900,
     webPreferences: {
      nodeIntegration: true
     }
    });

  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "/dist/index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // The following is optional and will open the DevTools:
  // win.webContents.openDevTools()
  win.on("closed", () => {
    win = null;
  });
}
app.on("ready", createWindow);
// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

