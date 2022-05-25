import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType, Mimetype } from "@adiwajshing/baileys";


export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "bank",
      description: "Displays user-bank",
      category: "games",
      usage: `${client.config.prefix}bank`,
      baseXp: 10,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    const user = M.sender.jid;
    const result = await (await this.client.getUser(user)).bank;
    const buttons = [
      {
        buttonId: "bank",
        buttonText: { displayText: `${this.client.config.prefix}bank` },
        type: 1,
      },
      ];
    
      const buttonMessage: any = {
      contentText: `🏦 *Bank | ${M.sender.username}*\n\n🪙 *US.Dollars🧸: ${result}*`,
      footerText: "Wick Ltd.",
      buttons: buttons,
      headerType: 1,
      };
      await M.reply(buttonMessage, MessageType.buttonsMessage);
      ;
    
    };
  }
