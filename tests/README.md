# Browser regression check

The app needs no npm install. This optional test uses Playwright to check literal
item rendering, edit prepopulation, completion and persistence across reloads.
It opens an isolated browser context and clears only that test context's storage.

Install the test tool outside the project, then serve the repository in a terminal:

```sh
npm install --prefix /tmp/crud-browser-tools playwright
/tmp/crud-browser-tools/node_modules/.bin/playwright install chromium
python3 -m http.server 8000 --bind 127.0.0.1
```

In another terminal, from this repository:

```sh
PLAYWRIGHT_MODULE=/tmp/crud-browser-tools/node_modules/playwright node tests/browser.cjs
```

Set `TEST_URL` if using another port. To use an installed browser, set `CHROME_PATH`
to its executable; for example, `/usr/bin/google-chrome` on Ubuntu. The test needs
internet access to load the same jQuery CDN dependency as the app.
