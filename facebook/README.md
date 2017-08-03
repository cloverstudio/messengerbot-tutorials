## Facebook messaging API tutorial

**Official tutorial is [here](https://developers.facebook.com/docs/messenger-platform/guides/quick-start)**

- Setup Facebook App [here](https://developers.facebook.com/apps)

- Setup Webhook. Webhook URL must be https and able to be access anywhere. 
I use AWS's ELB so you can get https free.

**You have to be careful for the respnse becase until it doesn't response in facebook's way facebook doesn't verify the url.**

- Setup Facebook page [here](https://www.facebook.com/pages/?category=your_pages)

- Connect the page and the app in App Console.

If you want make the bot public you have to pass the review. Until then you can test the bot as admin.

**I couldn't send message via web, but I could send message via facebook messenger.**
