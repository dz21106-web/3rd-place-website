from google import genai
from google.genai import types
import os

API_KEY = "AIzaSyBJbPcMjnannZq4qcHheRv3w7I5cRvzmN0"
client = genai.Client(api_key=API_KEY)

prompt = """A warm and friendly circular logo for a community platform called "3rd place".
Design style: minimal, clean, vector-like illustration.
Central element: bold lowercase text "3rd place" in the center.
Surrounding the text: a hand-drawn-style circle made of connected nodes (dots) with lines between them, representing a community network. 4 to 6 colorful dots (coral, warm orange, soft yellow, light green) placed around the circle.
Background: off-white / warm cream color.
Typography: bold, rounded sans-serif font for "3rd place".
Color palette: dark navy for text and lines, warm coral and soft earth tones for the accent dots.
Overall feel: warm, approachable, human, community-oriented.
Square format, no extra text, no tagline."""

output_dir = "/Users/fukushidaichi/Desktop/claude code/3rd place job housing referral bank/logos"
os.makedirs(output_dir, exist_ok=True)

print("Generating logo images...")

response = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE", "TEXT"],
    ),
)

saved = 0
for part in response.candidates[0].content.parts:
    if part.inline_data is not None:
        path = os.path.join(output_dir, f"logo_{saved+1}.png")
        with open(path, "wb") as f:
            f.write(part.inline_data.data)
        print(f"Saved: {path}")
        saved += 1
    elif part.text:
        print(f"[Model message]: {part.text}")

if saved == 0:
    print("No images were generated.")
else:
    print(f"Done! {saved} image(s) saved to {output_dir}")
