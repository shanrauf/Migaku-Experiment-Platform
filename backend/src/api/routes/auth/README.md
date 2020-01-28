# /auth API

## /auth/discord

### GET (200 || 401)

Goes through OAuth 2.0 flow for Discord and attaches Participant cookie for future requests or returns 401 error

## TODO
- Automatically reauthenticate when access token expires (although that might not be relevant due to current setup...)
