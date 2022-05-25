import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType, Mimetype } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "deposit",
      description: "Deposit your gold to bank",
      aliases: ["deposit"],
      category: "games",
      usage: `${client.config.prefix}deposit <amount>`,
      baseXp: 30,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    const user = M.sender.jid;
    if (!joined)
      return void M.reply(`Specify the amount of money you want to deposit, Baka!`);
    const amount: any = joined.trim();
    if (isNaN(amount))
      return void M.reply(
        `*https://en.wikipedia.org/wiki/Number*\n\nI think this might help you.`
      );

    const wallet = await (await this.client.getUser(user)).wallet;
    const bank = await (await this.client.getUser(user)).bank;

    const buttons = [
      {
        buttonId: "bank",
        buttonText: { displayText: `${this.client.config.prefix}bank` },
        type: 1,
      },
    ];

    if (bank >= 500000000)
      return void M.reply(
        `😑 *You can't have more than 500000000 US dollars in your bank*.`
      );
    if (wallet < amount)
      return void M.reply(
        `😂 *You are too broke to make this transaction, get a life*.`
      );
    await this.client.deposit(user, amount);
    const buttonMessage: any = {
      contentText: `You have transferred *${amount} US dollars* to your bank.`,
      footerText: "Wick Ltd.",
      buttons: buttons,
      headerType: 1,
    };
    await M.reply(buttonMessage, MessageType.buttonsMessage);
  };
}


