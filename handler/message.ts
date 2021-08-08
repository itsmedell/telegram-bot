import {
    Context
} from "telegraf";
import { ContextMessage } from "../lib/constant";

/**
 * Message / Command handler
 * @param context 
 */
export async function MessageHandler(context: Context, rawMessage: any) {
    if (!context.message) return
    console.log(context.message)
    const message: ContextMessage = rawMessage
    
}