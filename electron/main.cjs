// Electron main process for the Meridian Bank Queue Intelligence desktop app.
// CommonJS (.cjs) on purpose: package.json has "type": "module".
const { app, BrowserWindow, shell } = require("electron");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const PORT = process.env.APP_PORT || 3000;
const APP_URL = `http://localhost:${PORT}`;
const isDev = !app.isPackaged && process.env.ELECTRON_DEV === "1";

let serverProcess = null;
let splashWindow = null;
let mainWindow = null;

function createSplash() {
  splashWindow = new BrowserWindow({
    width: 520,
    height: 340,
    frame: false,
    resizable: false,
    transparent: false,
    backgroundColor: "#060b16",
    center: true,
    show: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false },
  });
  splashWindow.loadFile(path.join(__dirname, "splash.html"));
}

function startServer() {
  if (isDev) return; // `npm run dev` already serves the app
  const entry = path.join(process.resourcesPath || path.join(__dirname, ".."), "app", ".output", "server", "index.mjs");
  const fallback = path.join(__dirname, "..", ".output", "server", "index.mjs");
  const serverEntry = require("fs").existsSync(entry) ? entry : fallback;

  serverProcess = spawn(process.execPath, [serverEntry], {
    env: { ...process.env, PORT: String(PORT), NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1" },
    stdio: "inherit",
  });
}

function waitForServer(retries = 120) {
  return new Promise((resolve, reject) => {
    const attempt = (left) => {
      const req = http.get(APP_URL, () => resolve()).on("error", () => {
        if (left <= 0) return reject(new Error("App server did not start"));
        setTimeout(() => attempt(left - 1), 400);
      });
      req.setTimeout(2000, () => req.destroy());
    };
    attempt(retries);
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    show: false,
    backgroundColor: "#0b1220",
    title: "Meridian Bank — Queue Intelligence",
    webPreferences: { contextIsolation: true, nodeIntegration: false },
  });

  mainWindow.loadURL(APP_URL);

  mainWindow.once("ready-to-show", () => {
    if (splashWindow) {
      splashWindow.destroy();
      splashWindow = null;
    }
    mainWindow.show();
    mainWindow.maximize();
  });

  // Open external links in the system browser instead of a new Electron window.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith(APP_URL)) return { action: "allow" };
    shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(async () => {
  createSplash();
  startServer();
  try {
    await waitForServer();
  } catch (err) {
    console.error(err);
  }
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
  if (serverProcess) serverProcess.kill();
});
