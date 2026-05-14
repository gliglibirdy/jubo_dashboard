---
name: jubo-brand-ui
description: >
  Use this skill whenever the user wants to build, generate, or modify any UI component or page that should match Jubo's brand visual style. Trigger whenever the user mentions building a UI, page, dashboard, component, form, table, dialog, or any frontend element — even if they don't explicitly say "brand style" or "Jubo style". This skill ensures all generated interfaces use the correct color palette, typography, spacing, layout structure, Logo, and component patterns from Jubo's design system. Always use this skill when creating or editing any frontend code for Jubo products.
---

# Jubo Brand UI Skill

This skill ensures Claude generates UI code that matches Jubo's brand visual style precisely. Read this entire file before writing any code.

---

## Tech Stack

This product is built with **React 19 + MUI (Material UI v9) + Tailwind CSS v3**, dual-track styling.

**Styling rules:**
- **Component-level styling** (colors, typography, internal padding, variants): use MUI `sx` prop or `styled()`.
- **Layout** (flex / grid / spacing between blocks): Tailwind utilities are preferred and shorter.
- **Do NOT** set the same property in both `sx` and `className` on the same element — specificity becomes unintuitive.
- Tailwind preflight is disabled; MUI `CssBaseline` handles reset. Tailwind has `important: '#root'` so utilities can override MUI inline styles when needed.

**MUI v9 specifics:**
- Grid v2 syntax: `<Grid size={{ xs: 12, sm: 6 }}>` — NOT the legacy `<Grid item xs={12}>`.
- All API calls should go through `@/lib/api` (configured Axios with token interceptor).

---

## Logo

The brand logo is an SVG wordmark. Always render it at `width="96" height="24"`. Use the raw SVG inline — do not use an `<img>` tag for the logo.

```svg
<svg width="96" height="24" viewBox="0 0 96 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M84.9883 3.38867C78.9177 3.38867 73.9766 7.76483 73.9766 13.1997C73.9766 18.6346 78.9177 23.0108 84.9883 23.0108C91.0589 23.0108 96.0001 18.6346 96.0001 13.1997C96.0001 7.76483 91.0589 3.38867 84.9883 3.38867ZM84.9883 18.07C81.6001 18.07 78.8471 15.8819 78.8471 13.1291C78.8471 10.447 81.6001 8.18833 84.9883 8.18833C88.3766 8.18833 91.1295 10.3764 91.1295 13.1291C91.0589 15.8819 88.3766 18.07 84.9883 18.07Z" fill="#0097A7"/>
  <path d="M60.7059 3.38799C58.5882 3.38799 56.5412 3.95266 54.8471 4.87024C54.7059 4.94082 54.5647 4.87024 54.5647 4.72907V0.21175C54.5647 0.0705833 54.4941 0 54.3529 0H49.8353C49.6941 0 49.6235 0.0705833 49.6235 0.21175V13.199C49.6235 19.6221 55.4824 23.0101 60.6353 23.0101C66.7059 23.0101 71.6471 18.6339 71.6471 13.199C71.7882 7.76415 66.8471 3.38799 60.7059 3.38799ZM60.7059 18.0693C57.3177 18.0693 54.5647 15.8812 54.5647 13.1285C54.5647 10.4463 57.3177 8.18764 60.7059 8.18764C64.0941 8.18764 66.8471 10.3757 66.8471 13.1285C66.8471 15.8812 64.0941 18.0693 60.7059 18.0693Z" fill="#0097A7"/>
  <path d="M42.2117 6.14062C42.0705 6.14062 41.9999 6.21121 41.9999 6.35238V12.5637C41.9999 15.5988 39.247 18.0692 35.8587 18.0692C32.4705 18.0692 29.7175 15.5988 29.7175 12.5637V6.35238C29.7175 6.21121 29.647 6.14062 29.5058 6.14062H24.9881C24.847 6.14062 24.7764 6.21121 24.7764 6.35238V12.5637C24.7764 18.9868 29.7175 23.01 35.7881 23.01C41.8587 23.01 46.7999 19.0573 46.7999 12.5637V6.35238C46.7999 6.21121 46.7293 6.14062 46.5881 6.14062H42.2117Z" fill="#0097A7"/>
  <path d="M0.211765 11.9987C0.0705882 11.9987 0 12.0692 0 12.2104V12.6339C0 19.057 5.50588 23.0802 11.0118 23.0802C17.7882 23.0802 22.0235 18.1394 22.0235 12.3516V0.846515C22.0235 0.705348 21.953 0.634766 21.8118 0.634766H17.2941C17.1529 0.634766 17.0824 0.705348 17.0824 0.846515V11.3634C17.0824 15.669 14.0471 18.1394 10.9412 18.1394C7.34118 18.1394 4.87059 16.0925 4.8 12.2104C4.8 12.0692 4.72941 11.9987 4.58824 11.9987H0.211765Z" fill="#0097A7"/>
</svg>
```

---

## Color Palette

```js
const colors = {
  // Brand
  primary:        '#0097A7',
  primaryDark:    '#005F64',
  primaryLight:   '#C5F0F7',   // nav active background

  // Neutrals
  secondary:      '#546E7A',
  secondaryDark:  '#37474F',
  secondary50:    '#ECEFF1',   // table header background

  // Semantic
  error:          '#D32F2F',
  success:        '#2E7D32',
  info:           '#0288D1',

  // Backgrounds
  bgPage:         '#EAF3F5',   // page/app background
  bgPaper:        '#FFFFFF',   // card/paper background

  // Text
  textPrimary:    'rgba(0,0,0,0.87)',
  textSecondary:  'rgba(0,0,0,0.6)',
  divider:        'rgba(0,0,0,0.12)',
  border:         'rgba(0,0,0,0.23)',  // outlined inputs
}
```

---

## Typography

Font family: **Noto Sans TC** (Traditional Chinese) + fallback `sans-serif`.

Load via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
```

Jubo 直接沿用 MUI 預設的 typography variant（`h1`~`h6`, `subtitle1`, `subtitle2`, `body1`, `body2`, `caption`, `button`, `overline`），**不要在 `theme.typography` 內重新覆寫這些預設值**。

僅以下為自訂或 override：

| Role              | Size  | Weight   | Letter Spacing | MUI variant       | 備註                         |
|-------------------|-------|----------|----------------|-------------------|------------------------------|
| Subtitle 3        | 16px  | 500      | 0.1px          | `subtitle3`       | 自訂 variant                 |
| Caption Medium    | 12px  | 500      | 0.4px          | `captionMedium`   | 自訂 variant                 |
| Table header      | 14px  | **700**  | 0.17px         | —                 | MUI 預設 + 在 `MuiTableCell.head` 強制改為 Bold |

使用方式：

```jsx
<Typography variant="subtitle3">小標題</Typography>
<Typography variant="captionMedium">強調附註</Typography>

// 或透過 sx
<Box sx={{ typography: 'subtitle3' }}>...</Box>
```

**Body text rule:**
- `body1` (16px) — 主要內容：說明文字、列表項目、表格內容、輸入框文字
- `body2` (14px) — 次要內容：輔助說明、次要標籤、表格次要欄位
- `caption` (12px) — 附註文字，**非常少用**：時間戳記、輔助提示、圖例說明

**Weight rule:** Regular (400) for body text, Medium (500) for titles / buttons / 自訂 medium variants, Bold (700) only for table headers.

---

## Spacing

Base unit: **4px**. All spacing should be multiples of 4.

Common values: `4, 8, 12, 16, 20, 24, 32, 48`

---

## Border Radius

| Element              | Radius  |
|----------------------|---------|
| Card / Block / Paper | `8px`   |
| Button               | `4px`   |
| Chip                 | `16px`  |
| Avatar / Icon btn    | `50%`   |
| Input (outlined)     | `4px`   |
| Progress bar         | `4px`   |
| Nav active pill      | `16px`  |

---

## Shadows

**Default: NO shadow.** Use `boxShadow: 'none'` for cards by default.

Use soft shadows **only** for overlaid elements:
- Dialog: `0px 11px 15px rgba(0,0,0,0.2), 0px 9px 46px rgba(0,0,0,0.12)`
- Snackbar: `0px 3px 5px rgba(0,0,0,0.2)`
- Floating elements that sit above the page content

Cards use a **1px border** (`rgba(0,0,0,0.12)`) instead of shadow when a boundary is needed. Most cards have no border either — just white background on the `#EAF3F5` page background creates enough separation.

---

## Page Layout Structure

```
┌──────────────────────────────────────────────┐
│  App Bar (height: 64px)                      │
│  [≡] [Logo] [Product Name]  ... [🔔][👤]     │
├────┬─────────────────────────────────────────┤
│Nav │  White content block (border-radius 8px) │
│Rail│  ┌───────────────────────────────────┐ │
│72px│  │ Page Header (64px)                  │ │
│    │  │ [Page Title]    [IconBtn] [+ Button]│ │
│    │  ├───────────────────────────────────┤ │
│    │  │ Page Content                        │ │
│    │  │ (table / form / custom layout)      │ │
│    │  └───────────────────────────────────┘ │
└────┴─────────────────────────────────────────┘
```

### App Bar
- Background: `#EAF3F5` (same as page, no shadow, no border-bottom)
- Height: `64px`
- Left: hamburger icon (72px wide zone) → inline Logo SVG → product name text (Medium 20px)
- Right: notification IconButton → username (Body 1, Secondary color) → Avatar IconButton
- Use MUI `AppBar` with `position="fixed"` or `"static"`, `color="transparent"`, `elevation={0}`

### Navigation Rail (collapsed)
- Width: `72px`, full height
- Background: `#EAF3F5`
- Each item: `72×72px`, flex column, centered
- Icon zone: `56×32px`, `border-radius: 16px`
- Icon color: `#005F64` (Primary Dark) — same in default and active states
- Active state: icon zone background `#C5F0F7`
- Label: Body 2, color `#005F64` (Primary Dark)
- No shadow, no border

### Navigation Drawer (expanded — toggled by hamburger icon)
- Triggered by clicking the hamburger `≡` icon in the App Bar
- Width: `256px`, full height
- Background: `#EAF3F5`
- No shadow, no border-right
- **Group labels** (e.g. "Records", "Protocols", "Facility Management"):
  - Font: Caption 12px, Regular, color Secondary (`#546E7A`)
  - Padding: `16px 16px 4px`
  - Not clickable
- **Nav items:**
  - Height: `48px`, padding: `0 16px`
  - Layout: icon (24px) + label (Body 1 16px), gap `16px`
  - Text and icon color: `#005F64` (Primary Dark) — same in default and active states
  - Default: no background
  - **Active state:** full-row background `#C5F0F7`, border-radius `0` (full width highlight); label weight 500
  - Hover: `rgba(0,151,167,0.08)` background
- Use MUI `<Drawer variant="permanent">` or `"temporary"` depending on context

### Content Area
- Background: `#EAF3F5`
- Padding: `0 16px 16px` (no top padding — app bar provides gap)
- **Most pages:** single white block (`border-radius: 8px`, `background: #FFFFFF`) that fills the content area
- **Dashboard only:** rows of cards with `gap: 16px` (each card is white, `border-radius: 8px`)

### Page Header (inside white content block)
- Height: `64px`
- Background: `#FFFFFF`
- Padding: `0 16px`
- Layout: left side + right side, `justify-content: space-between`, `align-items: center`
- **Left:** Page title — H6 (Medium 20px, `rgba(0,0,0,0.87)`)
- **Right:** action buttons — IconButtons (edit, delete, etc.) + primary Contained Button


### Contained Button (primary action)
- Background: `#0097A7`
- Text: white, Medium 14px, uppercase, letter-spacing 0.4px
- Border radius: `4px`
- Padding: `6px 16px`
- Elevation: `0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px rgba(0,0,0,0.14), 0px 1px 5px rgba(0,0,0,0.12)` (MUI Elevation/2 — **exception** to the no-shadow rule, buttons retain their MUI elevation)
- Optional leading icon (20px)

### Cards (Dashboard only)
- Background: `#FFFFFF`
- Border radius: `8px`
- No shadow (default)
- Padding: `16px`
- Title: H6 (Medium 20px), text primary
- Content gap: `16px`

---

## Key Components

### Table
- Header row background: `#ECEFF1`
- Header text: Bold 14px, color `#546E7A` (Secondary)
- Row divider: `1px solid rgba(0,0,0,0.12)`
- Cell padding: `6px 16px`
- Row height: ~44px (standard) or ~64px (with actions)
- No outer border on table — contained within card

### Chip (Filled M3 Style)
- Border radius: `16px`
- Padding: `4px` (container) + `3px 6px` (label)
- Text: 13px Regular
- Colors use 12% opacity backgrounds:
  - Info: bg `rgba(2,136,209,0.12)`, text `#0288D1`
  - Success: bg `rgba(46,125,50,0.12)`, text `#2E7D32`
  - Error: bg `rgba(211,47,47,0.12)`, text `#D32F2F`
  - Primary: bg `rgba(0,151,167,0.12)`, text `#0097A7`

### Button (Text variant)
- Primary text buttons: color `#0097A7`
- Font: Medium 14px, letter-spacing 0.4px, UPPERCASE
- No background, no border, no shadow
- Used for "顯示更多" actions at bottom of lists

### Outlined Input / Select
- Border: `1px solid rgba(0,0,0,0.23)`
- Border radius: `4px`
- Padding: `8px 12px`
- Label floats, arrow dropdown on right

### Progress Bar (custom)
- Active fill: `#0097A7`
- Inactive fill: `rgba(120,144,156,0.08)`
- Height: `16px`, border-radius: `4px`
- Left side rounded on both ends; the two sections join seamlessly

### Divider
- `1px solid rgba(0,0,0,0.12)`
- Horizontal only (use MUI `<Divider />`)

---

## MUI Theme Config (Reference)

```js
const theme = createTheme({
  palette: {
    primary:   { main: '#0097A7', dark: '#005F64', light: '#C5F0F7' },
    secondary: { main: '#546E7A', dark: '#37474F' },
    error:     { main: '#D32F2F' },
    success:   { main: '#2E7D32' },
    info:      { main: '#0288D1' },
    background: { default: '#EAF3F5', paper: '#FFFFFF' },
    text: {
      primary:   'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.6)',
    },
    divider: 'rgba(0,0,0,0.12)',
  },
  typography: {
    fontFamily: "'Noto Sans TC', sans-serif",
    fontWeightLight:   400,
    fontWeightRegular: 400,
    fontWeightMedium:  500,
    fontWeightBold:    700,
    // 其餘 variant 全沿用 MUI 預設，不要再覆寫
    subtitle3:     { fontSize: '16px', fontWeight: 500, lineHeight: 1.5,  letterSpacing: '0.1px' },
    captionMedium: { fontSize: '12px', fontWeight: 500, lineHeight: 1.66, letterSpacing: '0.4px' },
  },
  shape: { borderRadius: 4 },  // MUI default; override per-component as needed
  shadows: ['none', ...Array(24).fill('none')],  // all shadows off by default
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subtitle3: 'p',
          captionMedium: 'span',
        },
      },
    },
    MuiCard:      { styleOverrides: { root: { borderRadius: 8, boxShadow: 'none' } } },
    MuiAppBar:    { styleOverrides: { root: { backgroundColor: '#EAF3F5', boxShadow: 'none' } } },
    MuiDialog:    { styleOverrides: { paper: { boxShadow: '0px 11px 15px rgba(0,0,0,0.2)' } } },
    MuiTableHead: { styleOverrides: { root: { backgroundColor: '#ECEFF1' } } },
  },
})
```

---

## Do's and Don'ts

**Do:**
- Use `#EAF3F5` as page background, white for cards/papers
- Use `Noto Sans TC` font
- Stick to 4px spacing multiples (Tailwind's default scale aligns: `p-1`=4px, `p-2`=8px, `p-4`=16px…)
- Use `border-radius: 8px` for cards, `16px` for chips/nav pills
- Prefer MUI components for interactive elements; use Tailwind for layout shells
- Use MUI Grid v2 syntax: `<Grid size={{ xs: 12, sm: 6 }}>`
- Keep shadows off except for dialogs/snackbars/overlaid elements
- Use the SVG logo inline at `96×24px`

**Don't:**
- Don't add drop shadows to cards or navigation
- Don't use colors outside the defined palette
- Don't use fonts other than Noto Sans TC
- Don't use spacing that isn't a multiple of 4px
- Don't use `font-weight: 700` except for table headers and rare strong emphasis
- Don't use `border-radius` larger than 8px for block elements
- Don't use legacy `<Grid item xs={12}>` syntax (that's MUI v4/v5 API)
- Don't set the same CSS property via both `sx` and `className` on one element
