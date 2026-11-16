# AllSurfaces Testing

This repository contains testing artifacts for AllSurfaces OroCommerce.

## Structure

- `src/content/docs/issues/` - Issue-specific testing documentation
  - Each issue has its own directory with a README or table of contents
  - Screenshots and other artifacts are stored in the issue directory
- `public/screenshots/` - Screenshots for the Astro/Starlight project

## Adding New Issue Documentation

1. Create a new directory in `src/content/docs/issues/` with the issue number and a slug
2. Add a README or table of contents file that describes the issue and the artifacts
3. Add screenshots and other artifacts to the issue directory
4. Update the index page to link to the new issue documentation
5. Link to the GitHub issue as the very first paragraph of content on each page

## Example

```
src/content/docs/issues/
├── 619-restricted-product-visibility/
│   ├── index.mdx
│   └── screenshots/
│       ├── screenshot-product-visible.png
│       └── screenshot-product-hidden.png
└── 620-another-issue/
    ├── index.mdx
    └── screenshots/
        └── screenshot-example.png
```
