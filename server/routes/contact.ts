import { Router, Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const contactRouter = Router();

// Rate limiter: Max 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many contact inquiries sent from this IP. Please try again in 15 minutes.",
  },
});

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  projectType?: string;
}

contactRouter.post("/", contactLimiter, (req: Request, res: Response): any => {
  const { name, email, message, projectType } = req.body as Partial<ContactPayload>;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Valid name is required.",
    });
  }

  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return res.status(400).json({
      success: false,
      error: "Valid email address is required.",
    });
  }

  if (!message || typeof message !== "string" || message.trim().length < 5) {
    return res.status(400).json({
      success: false,
      error: "Message must be at least 5 characters.",
    });
  }

  // Simulated notification / webhook log
  console.log("📨 [New Inquiry Received]:", {
    name: name.trim(),
    email: email.trim(),
    projectType: projectType || "General Inquiry",
    message: message.trim(),
    timestamp: new Date().toISOString(),
  });

  return res.status(200).json({
    success: true,
    message: `Thank you, ${name.trim()}! Your message has been received. I will be in touch shortly.`,
    receivedAt: new Date().toISOString(),
  });
});
