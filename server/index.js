import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { prisma } from "./db.js";
import { demoSchema, signupSchema, zodFields } from "./validation.js";
import { sendDemoEmails, sendSignupEmails } from "./email.js";

const app = express();
const port = Number(process.env.PORT || 4001);

app.set("trust proxy", 1);
app.use(helmet());

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Origin not allowed"));
    },
  })
);
app.use(express.json({ limit: "32kb" }));

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again shortly." },
});

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ success: true, database: "connected" });
  } catch {
    res.status(503).json({ success: false, database: "unavailable" });
  }
});

app.post("/api/signup", formLimiter, async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Please check the highlighted information.",
      fields: zodFields(parsed.error),
    });
  }

  try {
    const request = await prisma.websiteSignupRequest.create({ data: parsed.data });
    void sendSignupEmails(request);

    return res.status(201).json({
      success: true,
      requestId: request.id,
      message: "Your onboarding request has been received.",
    });
  } catch (error) {
    console.error("Signup request failed:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "We couldn't save your request right now. Please try again.",
    });
  }
});

app.post("/api/demo", formLimiter, async (req, res) => {
  const parsed = demoSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Please check the highlighted information.",
      fields: zodFields(parsed.error),
    });
  }

  const today = new Date().toISOString().slice(0, 10);
  if (parsed.data.date < today) {
    return res.status(400).json({
      success: false,
      message: "Please choose a current or future date.",
      fields: { date: "Choose a current or future date" },
    });
  }

  try {
    const request = await prisma.demoRequest.create({
      data: {
        fullName: parsed.data.fullName,
        companyName: parsed.data.companyName,
        workEmail: parsed.data.workEmail,
        phone: parsed.data.phone,
        teamSize: parsed.data.teamSize,
        preferredDate: new Date(`${parsed.data.date}T12:00:00.000Z`),
        preferredTime: parsed.data.time,
        note: parsed.data.note || null,
      },
    });
    void sendDemoEmails(request);

    return res.status(201).json({
      success: true,
      requestId: request.id,
      message: "Your preferred demo request has been received.",
    });
  } catch (error) {
    console.error("Demo request failed:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "We couldn't save your demo request right now. Please try again.",
    });
  }
});

app.use((error, _req, res, _next) => {
  if (error?.message === "Origin not allowed") {
    return res.status(403).json({ success: false, message: "Origin not allowed." });
  }
  console.error("Unhandled API error:", error);
  return res.status(500).json({ success: false, message: "Unexpected server error." });
});

const server = app.listen(port, () => {
  console.log(`Bispun website API running on http://localhost:${port}`);
});

async function shutdown() {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
