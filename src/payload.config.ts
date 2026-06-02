import { mongooseAdapter } from "@payloadcms/db-mongodb";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { richTextEditor } from "./lib/editor.ts";
import { Users } from "./collections/Users.ts";
import { Media } from "./collections/Media.ts";
import { Homepage } from "./collections/Homepage.ts";
import { Navigation } from "./collections/Navigation.ts";
import { StoryChapters } from "./collections/StoryChapters.ts";
import { Pages } from "./collections/Pages.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Homepage, Navigation, StoryChapters, Pages],
  editor: richTextEditor,
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  sharp,
  plugins: [],
  // Leave serverURL undefined in local dev so Payload emits relative media
  // URLs (e.g. /api/media/file/...). Absolute localhost URLs break whenever the
  // dev server runs on a port other than 3000. In production we use the real URL.
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined),
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    'https://denvanskeligesamtalen.org',
  ].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000', 
    'https://denvanskeligesamtalen.org',
  ].filter(Boolean),
});
