# TabTell website

Public product and privacy pages for the TabTell Chrome extension.

## Local development

```bash
npm install
npm run dev
```

Run `npm run build` and `npm test` before publishing.

The public privacy policy is available at `/privacy/`.

## GitHub Pages

The repository includes a GitHub Actions workflow for static deployment. The
workflow uses `npm run build:pages`, publishes the generated `out/` directory,
and supports both the temporary `greatzh.github.io/tabtell-site` address and
the `tabtell.imzh.me` custom domain.

GitHub Pages must use **GitHub Actions** as its publishing source. Keep the
custom domain set to `tabtell.imzh.me`.

The original workspace keeps `.openai/hosting.json` for its existing Sites
deployment. Do not copy that local binding into the standalone public website
repository.
