import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'ship',
            description: `Ship people with you or someone`,
            category: 'fun',
            usage: `${client.config.prefix}ship [tag/quote user]`,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const percentage = Math.floor(Math.random() * 100)
        let sentence
        if (percentage < 25) {
            sentence = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\tRest and the one who shipped should stop forcing it`
        } else if (percentage < 50) {
            sentence = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\t Weird👀, frieeeend zone🕺`
        } else if (percentage < 75) {
            sentence = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\t\tJust ship another person,yall friends man😐`
        } else if (percentage < 90) {
            sentence = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\t\tHaii too much connection yall are fated`
        } else {
            sentence = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\tJust date already 🌝`
        }

        if (M.quoted?.sender && !M.mentioned.includes(M.quoted.sender)) M.mentioned.push(M.quoted.sender)
        while (M.mentioned.length < 2) M.mentioned.push(M.sender.jid)
        const user1 = M.mentioned[0]
        const user2 = M.mentioned[1]
        const data = JSON.parse((this.client.assets.get('ship') as Buffer)?.toString()) as unknown as {
            shipJson: {
                id: number
                shipPercent: string
                gifLink: string
            }[]
        }

        const ship = data.shipJson.filter((ship) => {
            const shipPercent = parseInt(ship.shipPercent)
            return Math.abs(shipPercent - percentage) <= 10
        })
        // choose a random gif from the array
        const gifLink = ship[Math.floor(Math.random() * ship.length)].gifLink
        let caption = `\t 🌝🍀Wick Ltd Love test🍀🌝

        caption += `\t\t---------------------------------\n`
        caption += `@${user1.split('@')[0]}  x  @${user2.split('@')[0]}\n`
        caption += `\t\t---------------------------------\n`
        caption += `${sentence}`

        return void M.reply(
            await this.client.util.GIFBufferToVideoBuffer(await this.client.getBuffer(gifLink)),
            MessageType.video,
            Mimetype.gif,
            [user1, user2],
            caption
        )
    }
}
