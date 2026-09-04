import type { Device } from "../types";
import hero from "@/assets/devices/new-nintendo-3ds-xl.webp";
import shotPrimary from "@upstream/tests/goldens/3ds/3ds-demo.64.png";
import shotAuxiliary from "@upstream/tests/goldens/3ds/3ds-demo.64.auxiliary.png";

export const nintendo3ds: Device = {
  slug: "nintendo-3ds",
  name: "Nintendo 3DS",
  shortName: "Nintendo 3DS",
  maker: "Nintendo",
  year: "2011 · 2014",
  sortYear: 2011,
  family: "handheld-console",
  collection: "permanent",
  tagline: "One QuickJS guest, two native PICA200 surfaces, touch on the auxiliary display.",
  plaque: [
    "Nintendo introduced the 3DS family in 2011. The hardware receipt recorded here uses the 2014 New Nintendo 3DS LL — sold as the New Nintendo 3DS XL outside Japan — with four ARM11 cores, 256 MB of RAM and a 268 MHz PICA200. Its 4.88-inch autostereoscopic upper screen presents 400×240 pixels per eye; the 4.18-inch 320×240 lower panel is resistive touch.",
    "PocketJS runs on the Japanese LL model as a `3ds-dev` Guest host. One application owns both displays: the primary 400×240 surface shows a contact detail while an independent 320×240 auxiliary DrawList holds a 10,000-row virtual list and receives touch. The host can package the runtime as a Homebrew Launcher `.3dsx` or an installed CIA.",
  ],
  hero: {
    src: hero,
    alt: "An open metallic-black New Nintendo 3DS XL, the model sold as New Nintendo 3DS LL in Japan",
    width: 1600,
    height: 1200,
    fit: "contain",
    credit: {
      author: "Ejay; transparent cutout by Pokemon59",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "Wikimedia Commons · New-3DS-XL-Black-Transparent-Fixed.png",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:New-3DS-XL-Black-Transparent-Fixed.png",
      note: "The XL name is used outside Japan; it is the same large-body model as the LL hardware receipt.",
    },
  },
  gallery: [
    {
      src: shotPrimary,
      alt: "PocketJS contact detail on the Nintendo 3DS upper screen",
      caption: "Primary surface: the selected contact stays on the 400×240 upper screen while the list moves below.",
      upstreamPath: "tests/goldens/3ds/3ds-demo.64.png",
    },
    {
      src: shotAuxiliary,
      alt: "PocketJS virtualized contact list on the Nintendo 3DS lower screen",
      caption: "Auxiliary surface: a 10,000-row virtual list on the 320×240 touch screen, captured from the same frame.",
      upstreamPath: "tests/goldens/3ds/3ds-demo.64.auxiliary.png",
    },
  ],
  headline: { cpu: "ARM11 MPCore ×4 · 804 MHz", memory: "256 MB + 10 MB VRAM", display: "400 × 240 + 320 × 240" },
  hardware: [
    {
      title: "Compute",
      items: [
        { label: "CPU", value: "4× ARM11 MPCore, up to 804 MHz", note: "PocketJS enables the New 3DS speedup and L2 cache at boot" },
        { label: "System processor", value: "ARM946, 134 MHz" },
        { label: "GPU", value: "Digital Media Professionals PICA200, 268 MHz" },
        { label: "RAM", value: "256 MB FCRAM + 10 MB VRAM", note: "64 MB of FCRAM is reserved for the operating system" },
      ],
    },
    {
      title: "Display & input",
      items: [
        { label: "Upper display", value: "4.88″ autostereoscopic LCD, 800 × 240", note: "400 × 240 per eye; PocketJS owns one native 400 × 240 surface" },
        { label: "Lower display", value: "4.18″ LCD, 320 × 240, resistive touch" },
        { label: "Input", value: "D-pad, Circle Pad, C-Stick, A/B/X/Y, L/R/ZL/ZR, Start/Select/Home" },
        { label: "Sensors", value: "Accelerometer, gyroscope, infrared face tracking; two rear VGA cameras and one front VGA camera" },
      ],
    },
    {
      title: "Storage & connectivity",
      items: [
        { label: "Storage", value: "1 GB internal flash; 4 GB microSDHC included" },
        { label: "Media", value: "Nintendo 3DS and Nintendo DS Game Cards" },
        { label: "Wireless", value: "Wi-Fi 802.11b/g, NFC, infrared" },
        { label: "Battery", value: "1750 mAh / 6.5 Wh lithium-ion", note: "rated for roughly 3.5–7 hours of 3DS software" },
      ],
    },
    {
      title: "Body",
      items: [
        { label: "Model", value: "RED-001", note: "New Nintendo 3DS LL in Japan; New Nintendo 3DS XL elsewhere" },
        { label: "Dimensions", value: "160 × 93.5 × 21.5 mm, closed" },
        { label: "Weight", value: "329 g", note: "including battery, stylus and microSD card" },
        { label: "Released", value: "3DS family: 26 February 2011 · receipt model: 11 October 2014 (Japan)" },
      ],
    },
  ],
  pocket: {
    path: "guest",
    status: "hardware",
    targetId: "3ds-dev (private, host ABI 8)",
    hostDir: "hosts/3ds",
    capabilities: ["text.glyphs.baked", "input.buttons", "display.auxiliary", "input.touch.auxiliary"],
    viewport: { logical: [400, 240], physical: [400, 240], density: 1 },
    summary:
      "QuickJS runs the guest while a `no_std` Rust static library owns the retained tree, layout, animation and DrawList emission. A C backend walks independent primary and auxiliary DrawLists into citro3d calls for the PICA200. The runtime embeds an admitted `.pocket` recovery guest, accepts authenticated guest updates over a paired Wi-Fi connection, and commits a candidate only after its first PICA command list retires successfully.",
    evidence:
      "The CIA boots and renders the calibration application on a New 3DS LL. Azahar runs the same PICA200 code path against top- and bottom-screen goldens; an installed CIA capture is byte-identical to the `.3dsx` goldens. The profile remains outside `POCKET_TARGETS` because the hardware and golden suite does not directly cover the synthesized cursor, sprites, streamed textures or a large font atlas.",
    docs: [
      { path: "hosts/3ds/README.md", label: "Nintendo 3DS host", summary: "Rust and devkitARM toolchains, dual PICA200 targets, `.3dsx` / CIA packaging, Wi-Fi updates and Azahar goldens." },
      { path: "docs/DEVTOOLS.md", label: "DevTools", summary: "Pairing and the native bottom-screen menu; guest updates and dual-screen captures over Wi-Fi." },
    ],
    code: [
      { path: "apps/3ds-demo/app.tsx", label: "3ds-demo/app.tsx", summary: "One Solid app split across a primary detail card and an auxiliary 10,000-row VirtualList." },
      { path: "apps/3ds-demo/pocket.json", label: "3ds-demo/pocket.json", summary: "The two-surface manifest admitted against the private 3ds-dev profile." },
      { path: "tools/3ds-profile.ts", label: "3ds-profile.ts", summary: "Host ABI 8, both fixed viewports and the private capability contract." },
      { path: "hosts/3ds/src/main.c", label: "main.c", summary: "libctru / citro3d boot, guest lifecycle and the dual-target frame loop." },
      { path: "hosts/3ds/src/gfx.c", label: "gfx.c", summary: "The DrawList-to-PICA200 walker." },
    ],
    stories: [],
    milestones: [
      { date: "2026-08-30", release: "0.11.0", text: "Nintendo 3DS joins the host set with two native surfaces and a paired Wi-Fi development loop." },
    ],
  },
  sources: [
    { label: "New Nintendo 3DS / LL — Nintendo", url: "https://www.nintendo.co.jp/hardware/3dsseries/new3ds/index.html" },
    { label: "New Nintendo 3DS / XL Operations Manual — Nintendo of Europe", url: "https://cdn02.nintendo-europe.com/media/downloads/support_1/new_nintendo_3ds/NewNintendo3DS_NewNintendo3DSXL_OperationsManual_UKV.pdf" },
    { label: "Nintendo 3DS hardware — 3dbrew", url: "https://www.3dbrew.org/wiki/Hardware" },
  ],
};
