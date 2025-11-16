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

/**
 * Main function called by TypingMind.
 * The name MUST be generate_flux_image to match plugin.json.
 */
async function generate_flux_image(params, userSettings) {
  const prompt = params?.prompt || "Untitled Flux image";

  const falApiKey = userSettings?.falApiKey;
  const defaultModel = userSettings?.defaultModel || "flux-pro";
  const width = Number(userSettings?.width || 1024) || 1024;
  const height = Number(userSettings?.height || 1024) || 1024;

  if (!falApiKey) {
    throw new Error("Please set your FAL.ai API key in the plugin settings.");
  }

  // Map dropdown model → fal model id
  const modelMap = {
    "flux-pro": "fal-ai/flux-pro/v1.1",
    "flux-dev": "fal-ai/flux/dev",
    "flux-schnell": "fal-ai/flux/schnell"
  };

  const modelId = modelMap[defaultModel] || modelMap["flux-pro"];

  const apiUrl = `https://fal.run/${modelId}`;

  const body = {
    input: {
      prompt,
      image_size: `${width}x${height}`,
      num_inference_steps: 8,
      guidance_scale: 2
    }
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Authorization": `Key ${falApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`FAL API error ${response.status}: ${errorText.slice(0, 400)}`);
  }

  const data = await response.json();

  // Try common fal shapes: result.data.images[0].url etc.
  const imageUrl =
    data?.data?.images?.[0]?.url ||
    data?.images?.[0]?.url ||
    null;

  if (!imageUrl) {
    console.error("Unexpected FAL response:", data);
    throw new Error("Could not find an image URL in the FAL response.");
  }

  const alt = escapeAlt(prompt).slice(0, 120);
  return `![${alt}](${imageUrl})`;
}
