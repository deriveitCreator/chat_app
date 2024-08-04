# U-Chat

![Electron](https://img.shields.io/badge/Electron-%231B1C26?style=for-the-badge&logo=Electron&logoColor=%239FEAF9)

This is a chat app called "u-chat". An app created for displaying chat.

This is my first Electron project and it's the first time I'm dealing with OAuth. For any advice, feel free to message me at (contact.deriveit@gmail.com).

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

## Updates

Versioning is done using "npm version [new-version] --git-tag-version false"

update 2.0:
- Built the basic components.

update 1.0:
- first commit