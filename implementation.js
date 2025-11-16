export default async function generateImage(inputs, context) {
  const { model, prompt, negative_prompt, width, height, steps, cfg, seed } = inputs;

  // Map model to its Fal.ai endpoint
  const endpoints = {
    "flux-dev": "https://fal.run/fal-ai/flux-dev",
    "flux-pro": "https://fal.run/fal-ai/flux-pro",
    "flux-schnell": "https://fal.run/fal-ai/flux-schnell",
  };

  const endpoint = endpoints[model];

  if (!endpoint) {
    throw new Error(`Unknown model selected: ${model}`);
  }

  const falKey = context.env.FAL_KEY;

  if (!falKey) {
    throw new Error(
      "Fal.ai API key missing. Please add FAL_KEY to TypingMind environment vars."
    );
  }

  const payload = {
    prompt: prompt,
    negative_prompt: negative_prompt || "",
    width: width || 1024,
    height: height || 1024,
    steps: steps || 28,
    guidance_scale: cfg || 7,
    seed: seed || 0,
  };

  // Make request to Fal.ai
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Key ${falKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Flux API error: ${errorText}`);
  }

  const json = await res.json();

  // Return direct URL (fastest)
  if (json?.images && json.images.length > 0) {
    return {
      image_url: json.images[0],
    };
  }

  return json;
}
