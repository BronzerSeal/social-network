"use client";
export function getAverageColor(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let r = 0,
        g = 0,
        b = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      const pixelCount = data.length / 4;

      r = Math.round(r / pixelCount);
      g = Math.round(g / pixelCount);
      b = Math.round(b / pixelCount);

      resolve(`rgb(${r}, ${g}, ${b})`);
    };
  });
}

export function getLightenColor(rgb: string, amount = 0.4) {
  const m = rgb.match(/\d+/g);
  if (!m) return rgb;

  let [r, g, b] = m.map(Number);

  r = Math.round(r + (255 - r) * amount);
  g = Math.round(g + (255 - g) * amount);
  b = Math.round(b + (255 - b) * amount);

  return `rgb(${r}, ${g}, ${b})`;
}
