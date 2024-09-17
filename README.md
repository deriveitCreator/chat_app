# U-Chat

![Electron](https://img.shields.io/badge/Electron-%231B1C26?style=for-the-badge&logo=Electron&logoColor=%239FEAF9)

This is a chat app called "u-chat". An app created for displaying chat for Youtube live streaming.

This is my first Electron project. For any advice, feel free to message me at (contact.deriveit@gmail.com).

The previous versions used Google OAuth and Youtube API's, but since the quotas are limited, I am now using iframes instead. I also used web scraping in version 4.0, but I did not want to violate TOS.

## How to use

When you open the app, you should be presented wih four options on the top:
- `Close`: closes the application.
- `Drag`: Lets you drag the window.
- `Donate`: If you want to donate to the creator.
- `Enable Always On Top`: Makes the window stay on top even when you click on some other application.
- `Settings`: Changes the footer to the "settings" form (which will contain buttons for changing settings).

The middle part between the top buttons and the footer is the main section where are the chats get displayed.

The footer has two buttons:
- The "Change appearance" button changes the main section to present some appearance-related settings.
- The "Connect to stream" button changes the main section so you can input the youtube stream id. When you submit the youtube id, it will say "Connected" even though if stream id is invalid.
  
Your appearance settings is stored in `static/settings.json`.

Pressing Ctrl+O will hide/show the options on the top.

Pressing Ctrl+F will hide/show the footer.

Pressing Tab moves you to the next input or button.

Also, This app makes its own server at port 3001.

## Updates

Versioning is done using "npm version [new-version] --git-tag-version false"

update 5.2:
- `public` folder renamed to `static`.

update 5.1:
- Shortcut Keys was not working when Youtube iframe was in focus. That is fixed now.
- Window position and size is now also saved.
- Added `onclick` function to close buttons.

update 5.0:
- Removed Google OAuth and web Scraping because I did not want to violate youtube TOS.
- Using iFrame instead.

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