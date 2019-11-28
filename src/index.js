const { app, BrowserWindow } = require('electron')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit()
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
	return new Promise((resolve, reject) => {
		mainWindow = new BrowserWindow({
			width: 200,
			height: 200,
			center: true,
			resizable: false,
			movable: false,
			minimizable: false,
			maximizable: false,
			closable: false,
			alwaysOnTop: true,
			fullscreenable: false,
			frame: false,
			show: false
		})

		mainWindow.loadURL(`file://${__dirname}/index.html`)
		resolve()
		mainWindow.on('closed', () => {
			mainWindow = null
		})
	})
}

app.on('ready', () => {
	createWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

setInterval(() => {
	mainWindow.show()
	setTimeout(() => {
		mainWindow.hide()
	}, 1600)
}, 10000)
