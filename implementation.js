function escapeAlt(text) {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, " ")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// This name MUST match pluginFunctions[0].name and openaiSpec.name in plugin.json
async function generate_flux_image(params, userSettings) {
  const { prompt, negative_prompt, model, seed } = params || {};
  const { falApiKey, defaultModel, width, height } = userSettings || {};

  if (!falApiKey) {
    throw new Error("Missing FAL.ai API Key in plugin settings.");
  }

  const finalModel = (model || defaultModel || "flux-pro").trim();

  const apiUrl = `https://api.fal.ai/v1/images/${finalModel}`;

  const payload = {
    prompt,
    negative_prompt: negative_prompt || undefined,
    image_size: [Number(width) || 1024, Number(height) || 1024],
    num_inference_steps: 8,
    guidance_scale: 2,
    seed: seed || undefined
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Authorization": `Key ${falApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`FAL API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  // FAL's exact response shape can vary slightly, but many image endpoints
  // include either `image.base64` or `images[0].base64`. We try both.
  let base64 = null;

  if (data.image && data.image.base64) {
    base64 = data.image.base64;
  } else if (Array.isArray(data.images) && data.images[0] && data.images[0].base64) {
    base64 = data.images[0].base64;
  }

  if (!base64) {
    throw new Error("FAL.ai response did not contain a base64 image.");
  }

  const alt = escapeAlt(prompt || "");
  return `![${alt}](data:image/png;base64,${base64})`;
}
