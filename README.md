# @fechorapps/ui

Angular 21 component library built with Tailwind CSS 4, Storybook, and Lucide icons. Published to GitHub Packages.

## Stack

- **Angular 21** — standalone components
- **Tailwind CSS 4** — utility-first styling
- **Storybook 10** — component documentation & visual testing
- **Lucide Angular** — icon set
- **Chart.js 4** — chart components
- **Transloco** — i18n support

## Components

| Category | Components |
|---|---|
| **Button** | Button, SpeedDial, SplitButton |
| **Form** | AutoComplete, CascadeSelect, Checkbox, Chips, ColorPicker, DatePicker, Editor, FloatLabel, IconField, InputGroup, InputMask, InputNumber, InputOTP, InputSwitch, InputText, Knob, Listbox, MultiSelect, Password, RadioButton, Rating, Select, SelectButton, Slider, Textarea, ToggleButton, TreeSelect, TriStateCheckbox |
| **Data** | DataView, OrderList, OrganizationChart, Paginator, PickList, Scroller, Table, Timeline, Tree, TreeTable |
| **Overlay** | ConfirmDialog, ConfirmPopup, Dialog, Drawer, Popover, Toast, Tooltip |
| **Panel** | Accordion, Card, Divider, Fieldset, Panel, Splitter, Tabs, Toolbar |
| **Menu** | Breadcrumb, ContextMenu, Dock, MegaMenu, Menu, Menubar, PanelMenu, Steps, TabMenu, TieredMenu |
| **Messages** | Message, Messages |
| **Media** | Carousel, Galleria, Image |
| **Misc** | Avatar, Badge, BlockUI, Chip, EmptyState, Inplace, MeterGroup, ProgressBar, ProgressSpinner, ScrollTop, Skeleton, Tag, Terminal |
| **File** | FileUpload |
| **Chart** | Chart |

## Installation

This package is published to GitHub Packages. Add the registry to your `.npmrc`:

```
@fechorapps:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Then install:

```bash
npm install @fechorapps/ui
```

## Peer Dependencies

```json
{
  "@angular/common": ">=21.0.0",
  "@angular/core": ">=21.0.0",
  "@angular/forms": ">=21.0.0",
  "@jsverse/transloco": ">=8.0.0",
  "chart.js": "^4.0.0",
  "lucide-angular": ">=0.500.0"
}
```

## Development

```bash
# Start Storybook
npm run storybook

# Build library
npm run build

# Build with file watching
npm run build:watch
```

## Release

```bash
npm run release:patch   # bug fix       1.0.0 → 1.0.1
npm run release:minor   # new feature   1.0.0 → 1.1.0
npm run release:major   # breaking change 1.0.0 → 2.0.0
```

Each command runs: **build → version bump → publish to GitHub Packages**.
