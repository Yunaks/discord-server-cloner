const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const axios = require('axios');

let guildroles = []
let guildchannels = []
let newschannels = []

console.log(`
▓██   ██▓ █    ██  ███▄    █  ▄▄▄       ██ ▄█▀    ▄████▄   ██▓     ▒█████   ███▄    █ ▓█████  ██▀███  
 ▒██  ██▒ ██  ▓██▒ ██ ▀█   █ ▒████▄     ██▄█▒    ▒██▀ ▀█  ▓██▒    ▒██▒  ██▒ ██ ▀█   █ ▓█   ▀ ▓██ ▒ ██▒
  ▒██ ██░▓██  ▒██░▓██  ▀█ ██▒▒██  ▀█▄  ▓███▄░    ▒▓█    ▄ ▒██░    ▒██░  ██▒▓██  ▀█ ██▒▒███   ▓██ ░▄█ ▒
  ░ ▐██▓░▓▓█  ░██░▓██▒  ▐▌██▒░██▄▄▄▄██ ▓██ █▄    ▒▓▓▄ ▄██▒▒██░    ▒██   ██░▓██▒  ▐▌██▒▒▓█  ▄ ▒██▀▀█▄  
  ░ ██▒▓░▒▒█████▓ ▒██░   ▓██░ ▓█   ▓██▒▒██▒ █▄   ▒ ▓███▀ ░░██████▒░ ████▓▒░▒██░   ▓██░░▒████▒░██▓ ▒██▒
   ██▒▒▒ ░▒▓▒ ▒ ▒ ░ ▒░   ▒ ▒  ▒▒   ▓▒█░▒ ▒▒ ▓▒   ░ ░▒ ▒  ░░ ▒░▓  ░░ ▒░▒░▒░ ░ ▒░   ▒ ▒ ░░ ▒░ ░░ ▒▓ ░▒▓░
 ▓██ ░▒░ ░░▒░ ░ ░ ░ ░░   ░ ▒░  ▒   ▒▒ ░░ ░▒ ▒░     ░  ▒   ░ ░ ▒  ░  ░ ▒ ▒░ ░ ░░   ░ ▒░ ░ ░  ░  ░▒ ░ ▒░
 ▒ ▒ ░░   ░░░ ░ ░    ░   ░ ░   ░   ▒   ░ ░░ ░    ░          ░ ░   ░ ░ ░ ▒     ░   ░ ░    ░     ░░   ░ 
 ░ ░        ░              ░       ░  ░░  ░      ░ ░          ░  ░    ░ ░           ░    ░  ░   ░     
 ░ ░                                             ░                                                                                                                                                                      
\n`);

readline.question('Enter your token: ', async (token) => {
readline.question('Enter your copy guild id: ', async(guildid) => {
console.log(`------------------------------------------`)
await getroles(guildid, token)
await getchannels(guildid, token)

setTimeout(async() => {
await guildCreate(token)
}, 3000)

})


})


async function guildCreate(token) {  
    try {
        await axios.post(
            'https://discord.com/api/v9/guilds',
            {
              'name': 'Yunak Server Cloner',
              'icon': null,
              'channels': guildchannels,
              "roles" : guildroles,
              'system_channel_id': null,
              'guild_template_code': '2TffvPucqHkN'
            },
            {
              headers: {
                'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                'X-Debug-Options': 'bugReporterEnabled',
                'sec-ch-ua-mobile': '?0',
                'Authorization': token.replace(/\r?\n|\r/g, ''),
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                'X-Discord-Timezone': 'Europe/Istanbul',
                'Content-Type': 'application/json',
                'Referer': 'https://discord.com/channels/@me',
                'X-Discord-Locale': 'tr',
                'sec-ch-ua-platform': '"Windows"'
              }
            }
          );
        console.log(`copy guild created!`)
        process.exit();
    } catch (error) {
      console.log('error !');
      process.exit();
    }
  }

async function getchannels(guildid , token) {
    await axios(`https://discord.com/api/v9/guilds/${guildid}/channels`, {
            method: 'GET',
            headers: {
                'Authorization': token.replace(/\r?\n|\r/g, ''),
            },
        })
        .then(async function(resp) {
            resp.data.forEach(async function(channel) {        
                if (channel.type == 4) {
                    guildchannels.push({
                        "name": channel.name,
                        "type": channel.type,
                        "id": channel.id,
                        "parent_id": channel.parent_id? channel.parent_id : null,
                        "permission_overwrites": channel.permission_overwrites,
                        "nsfw": channel.nsfw,
                        "pos": channel.position
                    })
                } else if (channel.type == 0) {
                    guildchannels.push({
                        "name": channel.name,
                        "type": channel.type,
                        "id": channel.id,
                        "parent_id": channel.parent_id? channel.parent_id : null,
                        "permission_overwrites": channel.permission_overwrites,
                        "topic": channel.topic,
                        "nsfw": channel.nsfw,
                        "rate_limit_per_user": channel.rate_limit_per_user? channel.rate_limit_per_user : 2,
                        "po": channel.position
                    })
                } else if (channel.type == 2) {
                    guildchannels.push({
                        "name": channel.name,
                        "type": channel.type,
                        "id": channel.id,
                        "parent_id": channel.parent_id? channel.parent_id : null,
                        "permission_overwrites": channel.permission_overwrites,
                        "topic": channel.topic,
                        "nsfw": channel.nsfw,
                        "user_limit": channel.user_limit,
                        "po": channel.position
                    })
                } else if (channel.type == 5) {
                    guildchannels.push({
                        "name": channel.name,
                        "type": 0,
                        "id": channel.id,
                        "parent_id": channel.parent_id? channel.parent_id : null,
                        "permission_overwrites": channel.permission_overwrites,
                        "topic": channel.topic,
                        "nsfw": channel.nsfw,
                        "po": channel.position
                    })
                    newschannels.push({
                        "name": channel.name,
                        "type": channel.type,
                        "id": channel.id,
                        "parent_id": channel.parent_id? channel.parent_id : null,
                        "po": channel.position
                    })
                }

            })
            guildchannels.sort((a, b) => (a.parent_id > b.parent_id) ? 1 : -1)
            guildchannels.sort((a, b) => (a.pos < b.pos) ? 1 : -1)
            guildchannels.sort((a, b) => (a.po > b.po) ? 1 : -1)

            console.log("successfully fetched channels")
        })
        .catch((e) => {
            console.log("error getting channels" + e)
        })

}
async function getroles(guildid, token) {
    await axios(`https://discord.com/api/v9/guilds/${guildid}/roles`, {
            method: 'GET',
            headers: {
                'Authorization': token.replace(/\r?\n|\r/g, ''),
            },
        })
        .then(async function(resp) {
            resp.data.map(async function(role) {
                guildroles.push({
                    "name": role.name,
                    "permissions": role.permissions,
                    "id": role.id,
                    "position": role.position,
                    "color": role.color,
                    "hoist": role.hoist,
                    "mentionable": role.mentionable
                })
            })
            guildroles.sort((a, b) => (a.position > b.position) ? 1 : -1)
            console.log("successfully fetched roles")
        })
        .catch((e) => {
            console.log("error getting roles" + e)
        })

}
