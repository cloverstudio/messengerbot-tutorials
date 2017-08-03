## Line messaging API tutorial

**Official tutorial is [here](https://developers.line.me/messaging-api/getting-started)**

- Register as normal user
- Create business account [here](https://business.line.me/ja/services/bot)

    -   Both Messaging API and Developer Trial worked for me for testing purpose.

    -   Seems like one user can create multiple business account.

    -   Business account is used not only bot, but here you can send messages to your customer via web consol and much more things you can do. So it is little bit confused if you expect it as only for messenger API.

- Just follow this [here](https://devdocs.line.me/en/)

    -   I have spent like 30min to find where to setup webhook url. So I write here to avoid wasting time.
        - Open [https://business.line.me/en/](https://business.line.me/en/)
        - Select Accounts ( Btw, You can create new bot here )
        - Click "Line Developers"
        - Here you can setup webhook URL

    - Verifing webhook signature is little bit confused.
        - First you have to get raw request body, [this article](https://coderwall.com/p/qrjfcw/capture-raw-post-body-in-express-js) was use ful.

        - Then user this source code to do verification.

        ```
        const signatureOrig = req.headers['x-line-signature'];
        
        // validate signature
        const channelSecret = init.lineChannelSecret;

        const body = req.rawBody; // Request body string
        const signatureGenerated = crypto.createHmac('SHA256', channelSecret).update(body).digest('base64');
        // Compare X-Line-Signature request header and the signature

        console.log(signatureOrig,signatureGenerated);
        ```