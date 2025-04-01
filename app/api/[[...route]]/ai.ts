import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { replicate } from "@/lib/replicate";

const app = new Hono()
  .post("/remove-bg",
    zValidator(
      "json",
      z.object({
        image: z.string()
      })
    ),
    async (c) => {
      const { image } = c.req.valid("json");

      const input = {
        image: image
      };

      const output = await replicate.run("lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1", { input });

      // @ts-expect-error url is a function on output
      const url = await output.url();

      return c.json({ data: url.href });
    }
  )
  .post("/generate-image", 
    zValidator(
      "json",
      z.object({
        prompt: z.string()
      }),
    ),
    async (c) => {
      const { prompt } = c.req.valid("json");

      const output = await replicate.run(
        "nvidia/sana:c6b5d2b7459910fec94432e9e1203c3cdce92d6db20f714f1355747990b52fa6",
        {
          input: {
            width: 1024,
            height: 1024,
            prompt: prompt,
            model_variant: "1600M-1024px",
            guidance_scale: 5,
            negative_prompt: "",
            pag_guidance_scale: 2,
            num_inference_steps: 18
          }
        }
      );

      // @ts-expect-error url is a function on output
      const url = await output.url();

      return c.json({ data: url.href });
    }
  );

export default app;