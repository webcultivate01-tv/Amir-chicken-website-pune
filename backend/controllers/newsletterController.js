import validator from "validator";
import { addSubscriber } from "../model/newsletterModel.js";

// public: called by the newsletter signup form
export const subscribe = async (req, res) => {
  try {
    const email = String(req.body.email ?? "").trim().toLowerCase();

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!validator.isEmail(email) || email.length > 150) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }

    const isNew = await addSubscriber(email);
    return res.status(201).json({
      message: isNew ? "You're subscribed! Watch your inbox for fresh stories." : "You're already on the list.",
    });
  } catch (error) {
    return res.status(500).json({ message: `Subscribe error ${error.message}` });
  }
};
