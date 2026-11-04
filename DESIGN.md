---
name: InformeClaro
description: The lab report rewritten as the ruled sheet a patient carries to the appointment.
colors:
  mesa: "#E6EAF2"
  papel: "#F6F7FB"
  superficie: "#FFFFFF"
  tinta: "#1F3FA8"
  tinta-hover: "#172F80"
  tinta-suave: "#E1E7F7"
  sello: "#5B3A9B"
  sello-suave: "#EEE9F6"
  texto: "#23262E"
  texto-2: "#4D5464"
  renglon: "#C9D3E6"
  renglon-fuerte: "#9EAECF"
  renglon-claro: "#D6DEEE"
  margen: "#E8BCCB"
  error: "#A3262A"
  error-suave: "#FBECEC"
  logo-teal: "#0F766E"
  sobre-tinta: "#FFFFFF"
  tinta-apagada: "#8E9BC6"
  error-borde: "#E8B9BB"
  seleccion: "#D3DBF3"
  perforado-impreso: "#888888"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.2vw, 2.875rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.625rem, 1.2rem + 1.5vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.2
  value-name:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.75rem
  lead:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  control:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.55
  small:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  stamp:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.06em"
  figure:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "1.5rem"
    fontWeight: 700
    fontFeature: "tnum"
  unit:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "0.9375rem"
    fontWeight: 500
    fontFeature: "tnum"
  brand:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 800
    lineHeight: 1.2
  status-mark:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  radio: "4px"
  sello: "3px"
spacing:
  pauta: "1.75rem"
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  container: "1120px"
components:
  button-primary:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.blanco}"
    typography: "{typography.control}"
    rounded: "{rounded.radio}"
    padding: "0.7rem 1.25rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.tinta-hover}"
    textColor: "{colors.blanco}"
  button-secondary:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    typography: "{typography.control}"
    rounded: "{rounded.radio}"
    padding: "0.7rem 1.25rem"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.tinta-suave}"
    textColor: "{colors.tinta}"
  button-text:
    textColor: "{colors.tinta}"
    typography: "{typography.control}"
    padding: "0 0.4rem"
    height: "44px"
  input:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.texto}"
    typography: "{typography.body}"
    rounded: "{rounded.radio}"
    padding: "0.7rem 0.85rem"
    height: "50px"
  tab:
    textColor: "{colors.texto-2}"
    typography: "{typography.control}"
    padding: "0 1rem"
    height: "48px"
  tab-active:
    textColor: "{colors.tinta}"
  sheet:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.texto}"
    rounded: "{rounded.radio}"
  tear-off-slip:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.texto}"
    padding: "1.75rem 1.5rem 1.5rem"
    width: "22rem"
  stamp-out-of-range:
    textColor: "{colors.sello}"
    typography: "{typography.stamp}"
    rounded: "{rounded.sello}"
    padding: "0.22rem 0.45rem 0.18rem"
  stamp-in-range:
    textColor: "{colors.tinta}"
    typography: "{typography.stamp}"
    rounded: "{rounded.sello}"
    padding: "0.22rem 0.45rem 0.18rem"
  stamp-no-range:
    textColor: "{colors.texto-2}"
    typography: "{typography.stamp}"
    rounded: "{rounded.sello}"
    padding: "0.22rem 0.45rem 0.18rem"
  alert-error:
    backgroundColor: "{colors.error-suave}"
    textColor: "{colors.error}"
    rounded: "{rounded.radio}"
    padding: "0.8rem 1rem"
---

# Design System: InformeClaro

## Overview

**Creative North Star: "Hoja para la cita" (the sheet for the appointment)**

InformeClaro is a consulting-room pad, not a dashboard. Each report becomes a sheet of pale pad paper laid on a cool blue-grey desk, ruled in faint blue at a fixed pitch, with a single pink margin rule down the left. Figures and actions are written in ballpoint-blue ink; the only other ink in the room is the violet of a rubber stamp, pressed beside the values worth discussing with the doctor. The questions for the appointment sit on a separate tear-off slip with a perforated top edge, ready to copy or print.

The system is calm and legible before it is anything else. The root size is 17px (106.25%) for older readers, every target is at least 44px and most are 48px, the whole UI uses one hyperlegible family with its monospace sibling reserved for numbers, and state is always a word plus an icon inside a stamp frame, never a colour alone. It deliberately refuses the clinical card dashboard with green, amber and red badges: there is no traffic-light palette anywhere, and out of range is violet, not red. Red exists only for real system errors.

Depth is paper on a desk: soft blue-tinted sheet shadows, hairline rules, dashed perforations. Motion is one short stamp press when values arrive and a slide for the phone's bottom bar; everything collapses under reduced motion. The sheet also prints: the print stylesheet strips the chrome and leaves the sheet and slip on white paper.

**Key Characteristics:**
- Ruled sheet whose rules are the real vertical grid (1.75rem pitch).
- Two inks only: ballpoint blue for figures and actions, violet stamp ink for out-of-range marks.
- Four-state rubber stamp in a fixed right-hand cell, text label always present.
- Printed range scale under each figure: two blue ticks bracketing the range, a ballpoint dot for the value.
- Perforated tear-off slip "Para tu cita"; on phones, a perforated bottom bar keeps it in reach.
- One type family (Atkinson Hyperlegible Next) with its Mono sibling only for figures, units and ranges.
- The logo stays teal and is the only teal in the system.

## Colors

A cool stationery palette: blue-grey desk, near-white pad paper, blue rules, one pink margin, and two inks.

### Primary
- **Ballpoint Blue** (tinta): every action and every figure. Filled buttons, active tab underline, value numbers, range ticks and dot, question numbers on the slip, link-like text buttons, focus ring, caret. Darkens to **Pressed Ballpoint** (tinta-hover) on hover; **Blue Wash** (tinta-suave) is the hover fill for secondary buttons and the active drop zone.

### Secondary
- **Stamp Violet** (sello): reserved for out-of-range values only: the double-ruled "Por encima" / "Por debajo" stamps, the value dot on the range scale when out of range, and the "para conversar" mark on history rows. **Violet Wash** (sello-suave) is its declared pale companion.

### Tertiary
- **Logo Teal** (logo-teal): lives only inside the mandatory mark (`public/favicon.svg`, mirrored in the Logo component). Never used for UI.

### Neutral
- **Desk** (mesa): page background behind the sheets; also the PWA background colour and the knock-out behind the slip's scissors.
- **Pad Paper** (papel): the sheet surface; also the 2px halo around the range dot.
- **Surface** (superficie): app bar, inputs, drop zone, tear-off slip, phone bottom bar, notes. Paper that is not the ruled pad. **Text on Ink** (sobre-tinta) is the label colour of filled buttons; **Faded Ink** (tinta-apagada) is a disabled button; **Selection** (seleccion) themes text selection; **Error Rule** (error-borde) frames error notes.
- **Carbon** (texto): body text and headings.
- **Pencil Grey** (texto-2): secondary text, metadata, ranges, units, inactive tabs.
- **Blue Rule** (renglon): hairline borders, list dividers, app bar edge.
- **Strong Rule** (renglon-fuerte): input borders, row-closing rules, the scale baseline, dashed perforations, neutral stamp frames.
- **Faint Rule** (renglon-claro): the ruling printed across the pad.
- **Margin Pink** (margen): the single vertical margin rule on every sheet.
- **Error Red** (error) on **Error Wash** (error-suave): system errors and the delete hover only.

### Named Rules
**The Two Inks Rule.** Content ink is ballpoint blue or stamp violet, nothing else. Violet means "a value outside the laboratory's printed range" and appears nowhere else.

**The No Traffic Light Rule.** No green, amber or red value states. In-range is a blue-outlined stamp; red is reserved for system errors and destructive hover.

**The Teal Stays In The Logo Rule.** The logo's teal is a brand asset, not a palette colour.

## Typography

**Display Font:** Atkinson Hyperlegible Next (with system-ui, -apple-system, Segoe UI, sans-serif), self-hosted at 400, 600, 800.
**Figures Font:** Atkinson Hyperlegible Mono (with ui-monospace, Cascadia Mono, monospace), self-hosted at 500, 700.

**Character:** One low-vision family carries everything; the Mono sibling is the "figures typewriter" used only for numbers, units, ranges and counts, always with tabular numerals so values align by column.

### Hierarchy
- **Display** (800, clamp 2rem to 2.875rem, 1.2, -0.01em): the sign-in screen's opening statement only, held to about 18ch.
- **Headline** (800, clamp 1.625rem to 2.25rem, 1.2): page headings. On the results sheet the heading is the count itself ("4 de 12 valores para conversar con tu médico") at 1.5rem, 1.625rem when the sheet container is 480px or wider.
- **Title** (800, 1.25rem; 1.125rem for "En resumen"): section and slip headings.
- **Value name** (800, 1.125rem, on the 1.75rem pitch): the name of each lab value.
- **Lead** (400, 1.125rem, max 60ch): intro paragraph under a page heading, in Pencil Grey.
- **Body** (400, 1rem on a 17px root, 1.55; 1.75rem on the ruled sheet; max 65ch): explanations and slip questions.
- **Control** (600): buttons, tabs, nav, field labels; active filter tab steps up to 800.
- **Small** (0.875rem to 0.9375rem): metadata, captions, engine line, disclaimer, footer.
- **Stamp** (800, 0.75rem, 0.06em, uppercase, line-height 1): stamp lettering, in the text face, never the Mono. History status marks use the same voice at 0.8125rem, 0.04em.
- **Figure** (Mono 700, 1.5rem, tabular, Ballpoint Blue): the measured value, right-aligned in a 3ch minimum slot. **Unit** (Mono 500, 0.9375rem, Pencil Grey) follows it.

### Named Rules
**The Mono Is For Numbers Rule.** Atkinson Hyperlegible Mono sets figures, units, ranges and counts only (including tab counts and slip numbering), always `tabular-nums`. Never prose, never stamps, never headings.

**The Weight Ladder Rule.** Hierarchy is carried by weight steps 400 / 600 / 800 within one family, not by switching faces.

## Layout

Phone first. The app is a sticky white bar over a 1120px centred column with fluid gutters (clamp 1rem to 2.5rem) and top padding of clamp 1.25rem to 2.5rem. Screens are narrower columns inside it: upload at 680px, history at 820px.

On the ruled sheet the rules are the grid. The sheet sets a pitch of 1.75rem, draws a 1px Faint Rule at the bottom of every pitch, and forces every descendant onto `line-height: 1.75rem`; vertical spacing inside the sheet is whole multiples of the pitch (row bottom padding, summary and button offsets; tabs and the "subir otro" button are exactly two pitches tall). Only stamps opt out (line-height 1). The value list opens with a double rule drawn inside one pitch.

Each value row is a four-line grid: name and stamp on the first line (stamp in a fixed right cell), figure and printed range on the second (figure column 7.5rem, 9rem once the sheet container reaches 480px), the range scale on the third (max 22rem), the plain sentence on the fourth. Each row closes with a Strong Rule.

Breakpoints: at 640px and below the nav drops to its own full-width row with equal tabs and history rows stack (delete button aligns right below). At 900px the sign-in screen becomes two columns (intro, example sheet and promises left; form right, gap 3.5rem). At 960px results become rows-left plus a 22rem slip pinned right (sticky at 6rem), and the phone bottom bar is removed. Below 960px the slip follows the sheet and the results column reserves 4.5rem at the bottom for the bar. The slip carries `scroll-margin-top: 9rem` so jumping to it lands with the perforated edge visible below the app bar.

Outside the sheet, spacing steps are 0.5, 0.75, 1, 1.5rem with 0.6 to 0.85rem for icon-text gaps.

## Elevation & Depth

Paper on a desk. Depth comes from sheet shadows tinted with the ink's dark blue, hairline rules and dashed perforations; there are no floating cards or hover lifts.

### Shadow Vocabulary
- **Sheet** (`box-shadow: 0 1px 2px rgb(23 47 128 / 0.06), 0 10px 28px -14px rgb(23 47 128 / 0.22)`): every sheet and the tear-off slip.
- **Bottom bar** (`box-shadow: 0 -8px 20px -14px rgb(23 47 128 / 0.3)`): the phone bar, cast upward.
- **Dot halo** (`box-shadow: 0 0 0 2px` Pad Paper): separates the range dot from the ticks; a cut-out, not elevation.

### Named Rules
**The Paper Rule.** Only paper casts shadows, and only the Sheet shadow. Controls stay flat; hover changes ink, never height.

## Shapes

Gently squared stationery corners: 4px on sheets, buttons, inputs, notes, alerts and the drop zone; 3px on stamps and history marks. Circles appear only as the range dot, the progress dot and the logo tile's own 14/64 rounding. Borders do the form work: 1px Blue Rule hairlines, 1.5px control borders, 2px dashed Strong Rule perforations (slip top edge, phone bar top edge, drop zone), and the 4px double frame of an out-of-range stamp. The slip's top corners are square where it was "torn"; only its bottom corners round. Icons are Lucide line icons at 15 to 22px, stroke 2 to 2.5, always paired with text.

## Components

### Buttons
Plain, firm, ink-filled.
- **Shape:** stationery corners (4px), 1.5px border matching the fill, minimum 48px tall (44px inside the phone bar).
- **Primary:** Ballpoint Blue fill, white 600 text, icon left; hover to Pressed Ballpoint via a 0.15s ease-out colour transition. Disabled uses a washed blue (#8E9BC6) with a not-allowed cursor.
- **Secondary:** white fill, Ballpoint Blue border and text; hover fills with Blue Wash.
- **Text button:** no frame, Ballpoint Blue 600, 44px tall, underline on hover (offset 0.2em).
- **Delete (history):** outline in Blue Rule with Pencil Grey text, isolated by space from the open action; turns Error Red on Error Wash on hover and focus.
- **Focus:** global 3px Ballpoint Blue outline, 2px offset, on every interactive element.

### Tabs (sign-in mode, results filter)
Underlined tabs on a Blue Rule baseline: 48px tall, Pencil Grey 600, hover to blue, active gets Ballpoint Blue text and a 3px blue underline (filter tab active weight 800). The filter tabs carry Mono counts. On the ruled sheet they are exactly two pitches tall and the baseline becomes an inset Strong Rule. The app-bar navigation uses the same underline language.

### Inputs / Fields
- **Style:** white, 1.5px Strong Rule border, 4px corners, 50px tall, label above in 600, hint below in Pencil Grey.
- **Hover / Focus:** border goes Ballpoint Blue on hover; focus is the global blue ring.
- **Error:** shown as an alert below the fields: Error Wash fill, Error Red text and icon, 1px pale red border.

### Notes and disclaimers
White note with a Blue Rule border for neutral status; inside the ruled sheet the disclaimer drops its frame and sits on the rules in small Pencil Grey with a blue info icon aligned to the pitch.

### Navigation
Sticky white app bar with a Blue Rule bottom edge: logo plus wordmark (800, 1.1875rem), underline nav tabs, user name (600, truncated at 10rem) and a text-style "Salir" pushed right. At 640px and below the nav takes a full row of equal tabs.

### Stamp (signature component)
A rubber stamp in a fixed right cell of each value row, always icon plus uppercase word, with an accessible label.
- **Por encima / Por debajo (alto, bajo):** Stamp Violet text and 4px double-ruled violet frame, tilted -3deg. On arrival it presses once: scale 1.3 to 1 over 0.5s `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 70ms per row after 120ms.
- **En rango (normal):** Ballpoint Blue text in a straight 1.5px Strong Rule frame, no tilt, no press.
- **Sin rango:** Pencil Grey text in a 1.5px dashed Strong Rule frame.
- History rows reuse the language as a status mark: neutral blue-outlined, or violet double frame tilted -2deg when the report has values to discuss.

### Printed range scale
A 1px Strong Rule baseline one pitch tall (max 22rem). The reference range is bracketed by two 2px Ballpoint Blue end ticks joined by a 2px blue bar; the value is an 11px ballpoint dot with a paper halo, violet when out of range. Decorative and hidden from assistive tech; the printed range text carries the meaning.

### Tear-off slip "Para tu cita"
White slip with a 2px dashed Strong Rule top edge, scissors icon knocked out on the desk colour over the perforation, square top and rounded bottom corners, Sheet shadow. Questions are numbered in blue Mono and divided by Blue Rule hairlines; actions are a full-width primary "Copiar preguntas" and secondary "Imprimir hoja". On desktop it is pinned beside the sheet.

### Phone bottom bar
Below 960px a fixed white bar with a dashed perforated top edge links to the slip ("scissors + N preguntas") and offers the copy action. It hides while the sheet head or the slip is in view by sliding down (translateY 110%, 0.3s `cubic-bezier(0.16, 1, 0.3, 1)`), honouring the safe-area inset.

### Drop zone and progress
White zone with a 2px dashed Strong Rule border; dragging over turns it Ballpoint Blue on Blue Wash. Processing steps are a ruled list: pending steps Pencil Grey with an empty 20px ring, the current step blue 600 with a spinner, finished steps carbon with a blue check.

### Motion and print
Only three motions exist: the stamp press, the bottom-bar slide, and a 1s linear spinner for loading. `prefers-reduced-motion: reduce` collapses all animations and transitions to 0.01ms. Print sets 11pt on white, hides the bar, footer, tabs, slip actions, scissors and phone bar, removes ruling, margin rule and shadows, keeps rows and slip items unbroken, and separates the slip with a grey dashed rule.

## Dark Mode

The same pad at night. Dark is not a separate design: every component reads the same semantic tokens and the dark palette redefines them. It follows the device setting by default (`prefers-color-scheme`), and the theme button in the app bar cycles Automatic → Light → Dark; a fixed choice is stored and written to `<html data-theme="light|dark">` before first paint, so there is no flash.

| Token | Light | Dark |
|---|---|---|
| mesa (desk) | #E6EAF2 | #11141B |
| papel (pad paper) | #F6F7FB | #1A1E28 |
| superficie | #FFFFFF | #222736 |
| tinta (ballpoint) | #1F3FA8 | #9DB0FF |
| tinta-hover | #172F80 | #BCC9FF |
| tinta-suave | #E1E7F7 | #262F4D |
| sobre-tinta | #FFFFFF | #0E1530 |
| sello (stamp) | #5B3A9B | #C4A8F5 |
| texto | #23262E | #E7E9EF |
| texto-2 | #4D5464 | #A8AFC0 |
| renglon / renglon-fuerte / renglon-claro | #C9D3E6 / #9EAECF / #D6DEEE | #343B4D / #4C5672 / #262C3A |
| margen | #E8BCCB | #5B3A4A |
| error / error-suave | #A3262A / #FBECEC | #FF9B9B / #3A2125 |

Rules: in dark the ink is light and the label on filled buttons turns dark (`sobre-tinta`), so contrast holds above 4.5:1; stamps stay double-ruled, now in lilac; shadows become plain black at higher opacity; the browser bar (`theme-color`) follows the effective theme (#FFFFFF light, #222736 dark). Printing always uses the light palette, whatever the screen theme.

## Languages

The interface ships in Spanish (Colombia) and English. The language button in the app bar shows the other language ("EN" / "ES"), the choice is stored, and the first visit follows the browser. `<html lang>` follows the choice, and generated content (explanations, summary, questions) carries the `lang` of the language it was generated in; a note appears when a sheet was generated in the other language. Dates use `es-CO` or `en-US` long format. Copy keeps the same voice in both languages: second person, calm, never alarming; out-of-range is "Por encima / Above", "Por debajo / Below".

## Do's and Don'ts

### Do:
- **Do** keep every line on a ruled sheet on the 1.75rem pitch; size blocks inside the sheet in whole pitches.
- **Do** set every figure, unit, range and count in Atkinson Hyperlegible Mono with tabular numerals, figures in Ballpoint Blue.
- **Do** show value state as a stamp with an icon and a word in a fixed right-hand cell; state is never colour alone.
- **Do** reserve Stamp Violet for out-of-range values and their marks.
- **Do** keep targets at 48px (44px minimum for compact controls) and the 17px root size.
- **Do** use the 4px stationery corner and the single Sheet shadow for paper surfaces.
- **Do** keep the logo exactly as `public/favicon.svg`, teal included.
- **Do** honour reduced motion and keep the print stylesheet producing a clean sheet and slip.

### Don't:
- **Don't** introduce green, amber or red value badges or a clinical card dashboard.
- **Don't** use red for anything but system errors and the destructive hover.
- **Don't** use teal outside the logo.
- **Don't** add a second display face or set prose, headings or stamps in the Mono.
- **Don't** tilt or animate in-range or no-range stamps; only out-of-range stamps are pressed in at an angle.
- **Don't** lift controls with shadows or translate them on hover.
