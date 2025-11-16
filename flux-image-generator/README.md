# TypingMind Flux.1 Plugin  
  
A custom TypingMind plugin for generating images using **Flux.1 Pro**, **Flux.1 Dev**, and **Flux.1 Schnell** through the **FAL.ai API**.  
  
This plugin was created to provide:  
- More freedom than DALL·E or ChatGPT image tools  
- Full control over prompts, negative prompts, seeds, and models  
- Stable defaults (8 steps, guidance 2)  
- Support for 1024x1024 images  
- Smooth and fast generation inside TypingMind  
  
---  
  
## Features  
  
### Supports 3 Flux Models  
- **flux-pro** — highest quality  
- **flux-dev** — balanced & versatile  
- **flux-schnell** — fastest  
  
### User Settings in TypingMind  
- FAL.ai API Key  
- Default model  
- Width / height  
- Seed (optional)  
- Negative prompt (optional)  
  
### Hidden Stable Defaults  
- Steps: **8**  
- Guidance: **2**  
  
---  
  
## Installation (TypingMind)  
  
1. Copy the raw link to `manifest.json`:  
   Example:  
   `https://raw.githubusercontent.com/YOURNAME/typingmind-flux-plugin/main/manifest.json`  
  
2. Open TypingMind → Settings → Plugins → Install from URL  
  
3. Paste the raw manifest.json URL  
   TypingMind will auto-load both `manifest.json` and `plugin.js`.  
  
4. Enter your **FAL.ai API Key** in plugin settings.  
  
---  
  
## Testing in TypingMind  
  
Use the plugin with prompts like:  
> "Generate a hyper-detailed illustration of an Afro-futuristic city at sunset, clean, soft, reflective surfaces, vibrant atmosphere, Flux Pro."  
  
Or simply the model:  
  
```
/imagine prompt: 4k space nebula model: flux-pro width: 1024 height: 1024 seed: 42
```  
  
---  
  
## Files  
  
- `plugin.json` — plugin manifest  
- `implementation.js` — main implementation  
  
---  
  
## Future Upgrades  
  
- Add more advanced parameters (batches, upscale)  
- Support other Flux models as FAL.ai adds them  
- In-UI option to preview outputs
