# U-Chat

![Electron](https://img.shields.io/badge/Electron-%231B1C26?style=for-the-badge&logo=Electron&logoColor=%239FEAF9)

This is a chat app called "u-chat". An app created for displaying chat.

This is my first Electron project and it's the first time I'm dealing with OAuth. For any advice, feel free to message me at (contact.deriveit@gmail.com).

## Prerequisites

Go to the [Google Cloud API library](https://console.cloud.google.com/apis/library), and enable Youtube Data API v3 (a project would be needed but you can make one if you don't have one). After that, create two credentials, an API key and an OAuth 2.0 Client ID.

The API key is needed for accessing public data like chat.
The OAuth key is needed to log in and send data.
I could let other users use my own API key and OAuth client but the quotas are limited.

## How to use

The footer can be in either a "send message" form or a "settings" form (this is the default). Click the "Send message" button (bottom left) to change the footer to the "send message" form. 

When you open the app, you should be presented wih four options on the top:
- `Close`: closes the application.
- `Drag`: Lets you drag the window.
- `Enable Always On Top`: Makes the window stay on top even when you click on some other application.
- `Settings`: Changes the footer to the "settings" form (which will contain buttons for changing settings).

The middle part between the top buttons and the footer is the main section where are the chats get displayed.

In the "settings" form, the footer has two settings-related button:
- The "Change appearance" button changes the main section to present some appearance-related settings.
- The "Connect to stream" button changes the main section so you can input your account details and stream details.

Clicking the "Send message" button will change the main section so show chat again.

Pressing Ctrl+O will hide/show the options on the top.

Pressing Ctrl+F will hide/show the footer.

Pressing Tab moves you to the next input or button.

Your settings (including your API key) is stored in `settings.json`, so please be careful when sharing this file.

## Updates

Versioning is done using "npm version [new-version] --git-tag-version false"

update 3.0:
- The read-only mode works now, only thing left is the custom emotes.

update 2.0:
- Built the basic components.

update 1.0:
- first commit