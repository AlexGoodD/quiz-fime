/* global __dirname, require, process  */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { app, BrowserWindow } = require('electron')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
      webSecurity: false, // 👈 Desactiva CORS y bloqueos de local files
      allowRunningInsecureContent: true, // 👈 Permite cargar módulos locales
    },
  })

  win.loadFile(path.join(__dirname, 'dist', 'index.html'))
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
