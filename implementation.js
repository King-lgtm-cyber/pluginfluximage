export async function flux_image_generator(params, context) {
  const prompt = params.prompt;
  const negative = params.negative_prompt || "";

  const model = context.settings.model || "flux-dev";
  const width = context.settings.width || 1024;
  const height = context.settings.height || 1024;

  const falKey = context.settings.falKey;

  const endpoints = {
    "flux-dev": "https://fal.run/fal-ai/flux-dev",
    "flux-pro": "https://fal.run/fal-ai/flux-pro",
    "flux-schnell": "https://fal.run/fal-ai/flux-schnell"
  };

  const endpoint = endpoints[model];

  const payload = {
    prompt,
    negative_prompt: negative,
    width,
    height
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Key ${falKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const json = await res.json();

  return `![Generated Image](${json.images[0]})`;
}
