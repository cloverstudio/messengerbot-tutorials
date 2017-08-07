## Telegram messaging API tutorial

**First, read [this](https://core.telegram.org/bots)**

### Setup Webhook

Everything is (here)[https://core.telegram.org/bots/api]

- Call https://api.telegram.org/bot<token>/setWebhook API
    - I made telegram/console/setupWebhook.js to make this eaier
    - Change this script and run $ node ./telegram/console/setupWebhook.js [token] [url] 
    - If it returns "{"ok":true,"result":true,"description":"Webhook was set"}" it succeeed.

- If you didn't receive webhook try call getWebhookInfo API to get errors. 
    - You can do this with this command $ node ./telegram/console/getWebhookInfo.js [token]

