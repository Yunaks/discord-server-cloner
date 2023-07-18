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
        const response = await axios.post(
            'https://discord.com/api/v9/guilds',
            {
              'name': 'Yunak Clone Server',
              'icon': null,
              'channels': guildchannels,
              'roles':guildroles,
              'system_channel_id': null,
              'guild_template_code': '2TffvPucqHkN'
            },
            {
              headers: {
                'authority': 'discord.com',
                'accept': '*/*',
                'accept-language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
                'authorization': token.replace(/\r?\n|\r/g, ''),
                'content-type': 'application/json',
                'origin': 'https://discord.com',
                'referer': 'https://discord.com/guild-discovery',
                'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                'x-debug-options': 'bugReporterEnabled',
                'x-discord-locale': 'tr',
                'x-discord-timezone': 'Europe/Istanbul',
                'x-super-properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6InRyLVRSIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzExNC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTE0LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL2VudHJvcHkuY2x1Yi8iLCJyZWZlcnJpbmdfZG9tYWluIjoiZW50cm9weS5jbHViIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjIxMzY5NSwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0='
              }
            }
          );
  
      console.log('successfully server');
      process.exit();
    } catch (error) {
      console.log('error:', error);
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
