"use server";

import { Telegraf } from "telegraf";
import { appConfig } from "@/configs/app.config";

const bot = new Telegraf(appConfig.TG_BOT_TOKEN);

export async function sendOrderMessage(recipientId: string, message: string) {
  try {
    await bot.telegram.sendMessage(recipientId, message);
  } catch (error) {
    console.error("Something wrong with send tg message:", error);
  }
}
