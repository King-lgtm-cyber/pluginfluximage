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

async function generate_flux_image(params, userSettings) {
  const { prompt, negative_prompt, model, seed } = params;
  const { falApiKey, defaultModel, width, height } = userSettings;

  if (!falApiKey) {
    throw new Error("Missing FAL.ai API Key in plugin settings.");
  }

  const finalModel = model || defaultModel;

  const payload = {
    prompt,
    negative_prompt: negative_prompt || undefined,
    image_size: [Number(width) || 1024, Number(height) || 1024],
    seed: seed || undefined,
    num_inference_steps: 8,
    guidance_scale: 2
  };

  const url = `https://api.fal.ai/v1/images/${finalModel}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Key ${falApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`FAL API Error: ${error}`);
  }

  const data = await response.json();

  if (!data || !data.image || !data.image.base64) {
    throw new Error("Invalid response from FAL.ai");
  }

  const alt = escapeAlt(prompt);

  return `![${alt}](data:image/png;base64,${data.image.base64})`;
}

module.exports = {
  generate_flux_image
};
