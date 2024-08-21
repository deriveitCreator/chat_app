# U-Chat

![Electron](https://img.shields.io/badge/Electron-%231B1C26?style=for-the-badge&logo=Electron&logoColor=%239FEAF9)
![Puppeteer](https://img.shields.io/badge/puppeteer-white?style=for-the-badge&logo=puppeteer&logoColor=25C2A0)

This is a chat app called "u-chat". An app created for displaying chat.

This is my first Electron project and it's the first time I'm dealing with OAuth. For any advice, feel free to message me at (contact.deriveit@gmail.com).

## How to use

When you open the app, you should be presented wih four options on the top:
- `Close`: closes the application.
- `Drag`: Lets you drag the window.
- `Donate`: If you want to donate to the creator.
- `Enable Always On Top`: Makes the window stay on top even when you click on some other application.
- `Settings`: Changes the footer to the "settings" form (which will contain buttons for changing settings).

The middle part between the top buttons and the footer is the main section where are the chats get displayed.

The footer can be either in "send message" mode or in "settings" mode (this is the default). Click the "Send message" button (bottom left) to change the footer to the "send message" mode. 

In the "settings" mode, the footer has two settings-related button:
- The "Change appearance" button changes the main section to present some appearance-related settings.
- The "Connect to stream" button changes the main section so you can input the youtube stream id.
  
Your appearance settings is stored in `settings.json`.

When you click "Connect to stream", you are given the option to sign in to Google and to input the youtube stream id. The stream id is required to show chat messages. Signing in to Google is only necessary to send messages. Sending messages is done via the Youtube API while reading chat messages is done via web scraping.

Clicking the "Send message" button will change the main section so show chat again.

Pressing Ctrl+O will hide/show the options on the top.

Pressing Ctrl+F will hide/show the footer.

Pressing Tab moves you to the next input or button.

This app makes its own server at port 3001, so make sure port 3001 is available.

## Updates

Versioning is done using "npm version [new-version] --git-tag-version false"

update 4.0:
- Added a donate button.
- For reading chat messages now uses web scraping (puppeteer).
- Google OAuth and Youtube APIs will be used for sending messages.

update 3.0:
- The read-only mode works now, only thing left is the custom emotes.

update 2.0:
- Built the basic components.

update 1.0:
- first commit