function escapeMarkdownAlt(text) {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, " ")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function flux_image_generator(params, userSettings) {
  const { prompt, negative_prompt = "" } = params;
  const falKey = userSettings.falKey;
  const model = userSettings.model || "flux-dev";
  const width = userSettings.width || 1024;
  const height = userSettings.height || 1024;
  const steps = userSettings.steps || 28;
  const cfg = userSettings.cfg || 7;

  if (!falKey) {
    throw new Error("Missing FAL API key. Add it in plugin settings.");
  }

  const endpoints = {
    "flux-dev": "https://fal.run/fal-ai/flux-dev",
    "flux-pro": "https://fal.run/fal-ai/flux-pro",
    "flux-schnell": "https://fal.run/fal-ai/flux-schnell"
  };

  const endpoint = endpoints[model];
  if (!endpoint) {
    throw new Error(`Unknown model: ${model}`);
  }

  const payload = {
    prompt,
    negative_prompt,
    width,
    height,
    steps,
    guidance_scale: cfg
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Key ${falKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (response.status === 401) {
    throw new Error("Invalid FAL API key.");
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  const data = await response.json();
  if (!data.images || data.images.length === 0) {
    throw new Error("No image returned by the Flux API.");
  }

  const url = data.images[0].url;
  const alt = escapeMarkdownAlt(prompt);

  return `![${alt}](${url})\n\n_Note: Save the image within 1 hour, or it will expire._`;
}
