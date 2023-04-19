// import DiscordJS, {GatewayIntentBits as Intents, Events as DiscordEvents, Role} from 'discord.js'

// import Commands from "./commands/Commands"
// import GetAppDataSource from './datasource';
// import { Member } from './entity/Member';
// import { MemberRole } from './entity/MemberRoles';
// import { RoleAssignment } from './entity/RoleAssignments';

// export default function StartBot(inDiscord=false) {

//     const GUILD_ID = process.env.GUILD_ID as string
//     var guild : DiscordJS.Guild | undefined;

//     const client = new DiscordJS.Client({
//         intents: [
//             Intents.Guilds,
//             Intents.GuildMessages,
//             Intents.DirectMessages,
//             Intents.MessageContent,
//             Intents.GuildMembers
//         ],
//     })

//     const DataSource = GetAppDataSource(inDiscord);

//     client.on(DiscordEvents.MessageCreate, m => {

//         if(m.content == "ping") {
//             m.reply({
//                 content: "pong to you, " + m.author
//             })
//         }
//     })

//     client.on(DiscordEvents.InteractionCreate, async i=>{
//         if(!i.isChatInputCommand()) return
//         const command = Commands.get(i.commandName)
//         if(command) {
//             await command.execute(i);
//         } else {
//             await i.reply({
//                 content: "I don't know that command."
//             })
//         }

//     })

//     /** RUN THE BOT */
//     DataSource.initialize().then(async()=>{
//         DataSource.query("SELECT NOW();").then( e=>{
//             console.log(e)
//         })

//         let role : MemberRole
//         let exists = await DataSource.manager.find(MemberRole, {
//             where: {role_name: MemberRole.Sample().role_name}
//         })
//         if (exists.length < 1) {
//             role = MemberRole.Sample()
//             await DataSource.manager.save(MemberRole, role)
//         } else {
//             role = exists[0]
//         }

//         let mem : Member
//         let exists2 = await DataSource.manager.find(Member, {
//             where: {
//                 email: Member.Sample().email
//             }
//         })
//         if(exists2.length < 1) {
//             mem = Member.Sample()
//             await DataSource.manager.save(Member, mem)
//         } else {
//             mem = exists2[0]
//         }

//         let ras : RoleAssignment
//         let exists3 = await DataSource.manager.find(RoleAssignment, {
//             where: {
//                 member: mem.id,
//                 member_role: role.role_name
//             }
//         })
//         if(exists3.length < 1) {
//             ras = new RoleAssignment()
//             ras.member = mem.id
//             ras.member_role = role.role_name
//             await DataSource.manager.save(RoleAssignment, ras)
//         } else {
//             ras = exists3[0]
//         }

//         console.log("got mem, role, ras")
//         console.log("mem created at ", mem.created_at)

//         /*client.login(process.env.TOKEN)*/
//     })

// }
