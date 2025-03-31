import { Hono } from "hono";
import { handle } from "hono/vercel";

import images from "./images";

export const runtime = "nodejs";

const app = new Hono()
  .basePath('/api')
  .route("/images", images);

export const GET = handle(app);

export type AppType = typeof app;