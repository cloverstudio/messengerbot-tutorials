## Twitter messaging API tutorial

**Official tutorial is [here](https://dev.twitter.com/docs)**

## You have to get access by applying your app to twitter from this form.
[https://gnipinc.formstack.com/forms/account_activity_api_configuration_request_form](https://gnipinc.formstack.com/forms/account_activity_api_configuration_request_form)

Until you don't have permission you will get like following error.

```
{"errors":[{"code":32,"message":"Could not authenticate you."}]}
```

## Setup Webhook

Unlike the other messaging platfor there are no web interface to register webhook URL.
You have to call [this API](https://dev.twitter.com/webhooks/reference/post/account_activity/webhooks) to register your webhook endpoint.

[Here](https://dev.twitter.com/webhooks/getting-started) is detailed document for setting up webhook.


