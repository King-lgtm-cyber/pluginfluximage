# TypingMind Flux.1 Plugin

A custom TypingMind plugin for generating images using **Flux.1 Pro**, **Flux.1 Dev**, and **Flux.1 Schnell** through the **FAL.ai API**.

This plugin was created to provide:
- More freedom than DALL·E or ChatGPT image tools
- Full control over prompts, negative prompts, seeds, and models
- Stable defaults (8 steps, guidance 2)
- Support for 1024×1024 images
- Smooth and fast generation inside TypingMind

---

## 🚀 Features

### ✔ Supports 3 Flux Models
- **flux-pro** – highest quality  
- **flux-dev** – balanced & versatile  
- **flux-schnell** – fastest  

### ✔ User Settings in TypingMind
- FAL.ai API Key
- Default model
- Width / height
- Seed (optional)
- Negative prompt (optional)

### ✔ Hidden Stable Defaults
- Steps: **8**
- Guidance: **2**

---

## 🔧 Installation (TypyingMind)

1. Copy the raw link to `manifest.json`:
   Example:
https://raw.githubusercontent.com/YOURNAME/typingmind-flux-plugin/main/manifest.json


2. Open TypingMind → **Settings → Plugins → Install from URL**

3. Paste the raw manifest.json URL  
TypingMind will auto-load both `manifest.json` and `plugin.js`.

4. Enter your **FAL.ai API Key** in plugin settings.

---

## 🧪 Testing in TypingMind

Use the plugin with prompts like:
Create a hyper-detailed illustration of an Afro-futurist city at sunset,
golden light, reflective surfaces, vibrant atmosphere, Flux Pro.


Or specify the model:

model: "flux-schnell"
prompt: "Fast concept sketch of a historical London street, cinematic."


---

## 🗂 Files

- **manifest.json** — plugin metadata + settings
- **plugin.js** — logic that calls the FAL.ai Flux API
- **README.md** — documentation (this file)

---

## 🔮 Future Upgrades

Planned improvements:
- Built-in upscaling
- LoRA support
- Flux.1 Turbo (if released)
- Multi-provider plugin (Flux + SDXL + DALL·E)

Pull requests welcome.  
Made by King 👑

