---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: ["src/index.css","src/components/Acceso.jsx","src/components/SubirInforme.jsx","src/components/ResultadoInforme.jsx","src/components/Historial.jsx"]
---

## Scope

The whole patient app (access, upload, results, history). Visitor mode: Operate. Phone first; desktop must hold.

## Audience and task

Patients of every age, often on a phone, reading a lab report they do not understand and preparing for the follow-up appointment. Constraints: never diagnose, calm over alarm, state never carried by color alone, cold-start loading must hold up.

## Direction contract

THESIS: The report becomes the sheet the patient carries to the appointment. Refuses the clinical card dashboard with green, amber and red badges.

OWN-WORLD: Consulting-room pad paper (#F6F7FB) ruled in pale blue (#C9D3E6) with one faint pink margin rule; ballpoint-blue ink (#1F3FA8) for actions and figures; violet rubber-stamp ink (#5B3A9B) reserved for out-of-range stamps; carbon text (#23262E); the logo stays teal. Atkinson Hyperlegible Next for text, Atkinson Hyperlegible Mono only for figures, units and ranges; stamp lettering in the text face, bold caps. 4px corners, double-ruled stamp frames, dashed perforation.

STORY: Sign in, upload the PDF, see in one line how many values are worth discussing, read each value beside its printed range with one plain sentence, then tear off the questions for the appointment. History is the stack of past sheets.

FIRST VIEWPORT: Results on a 390 phone: app bar (logo, name, user, Salir); sheet head (the count as the heading itself, file, date and engine printed below it; no label above the heading); filter tabs; ruled rows with name, large tabular value and unit, printed range in its own column, stamp in a fixed right cell, one plain sentence. Desktop: rows left, the tear-off slip pinned right. Signature move: stamps pressed into fixed cells with one short press on arrival, and the perforated tear-off "Para tu cita" with copy and print.

FORM: Hoja para la cita, position 5 of 7 on the ordered list. seed:109c9f0dd85770f8

Raises: fixed furniture per value (character catalog); delete isolated by space, outline until focused (dark console); state as a mark in a fixed cell, hierarchy by weight (timetable rack); unit and range in their own column (centre-rail setting); the ruled lines are the real grid (Crouwel specimen); tabular figures aligned by column (datamatics).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
