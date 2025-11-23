import asyncio
import base64
import os

from agents import Agent, Runner

import dotenv

dotenv.load_dotenv()


async def main():
    image_path = "src/assets/real-images/real-fridge2.jpg"
    with open(image_path, "rb") as image_file:
        base64_image = base64.b64encode(image_file.read()).decode("utf-8")

    agent = Agent(
        name="Assistant",
        model="gpt-4.1",
        instructions="You are a general assistant that can help with a variety of tasks.",
    )

    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "input_image",
                    "image_url": f"data:image/png;base64,{base64_image}",
                },
                {
                    "type": "input_text",
                    "text": "What is in this image?",
                },
            ],
        },
    ]

    import rich

    rich.print(messages)
    result = await Runner.run(starting_agent=agent, input=messages)

    print(result.final_output)


if __name__ == "__main__":
    asyncio.run(main())