import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { replicate } from "@/lib/replicate";

const app = new Hono()
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

      // @ts-expect-error
      const url = await output.url();

      return c.json({ data: url.href });
    }
  );

export default app;