# Welcome To The Southface Repo!
## Useful Links
Make sure you have gone through this walkthrough and all the links down below:
- [Code Tour](/CODETOUR.md)
- [Engineering Onboarding Guide](https://gtbitsofgood.notion.site/Engineering-Onboarding-Guide-a22683c9388a4b9fb03de442f6664aae)
- [Figma/Design](https://www.figma.com/file/YTJqtLkjyxYdS3UkfR9dza/Southface-%2F-Fall22?node-id=0%3A1&t=HjMuBBxgKAeaLCzm-1)
## Stack

- React.js: Front-end
- Next.js: API routes and server-side rendering
- MongoDB: Permanently storing info
- iron-session: Authentication session handling for SSR/SSG
- eslint: Automatically identifying and fixing code errors
- prettier: Setting a common code style and fixing any issues.
- yarn: Package management. If you do not have yarn, run `npm install -g yarn` to install yarn globally.

## Development

1. Clone this project to your computer (preferably use VS Code)

```
git clone https://github.com/GTBitsOfGood/southface.git
```

2. Navigate to this project in your terminal

```
cd southface
```

3. Install Node Version Manager (NVM)

- follow [this guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) if you don't have NVM already to install it onto your machine.

4. Switch to node version 16.X

```
nvm install 16 && nvm use 16
```

4. Install the dependencies (make sure to use yarn and not npm):

```
yarn
```

5. Obtain your secrets -- Linux or MacOS (Skip if Windows); you will need to obtain a password from your Engineering Manager:

```
yarn secrets:linux
```

5. Obtain your secrets -- Windows Machines (Skip if MacOS or Linux); you will need to obtain a password from your Engineering Manager:

```
yarn secrets:windows
```

Contact your EM for the Bitwarden password. **NEVER EVER** commit `.env.local` to your version control system.

## MongoDB

A running instance of MongoDB is required this project.

- Download [mongoDB compass](https://www.mongodb.com/try/download/compass)
- Launch MongoDB Compass. When prompted for the connection URL, copy and paste `DB_URL` from your `.env.local` file.

You should now have write access to the different collections available.

## Running

To understand this code better, read the [Code Tour](/CODETOUR.md).

### Development

- Run `yarn dev`

### Production

- Run `yarn start`

## Additional Information

- Use `[INITIALS]/[ISSUE_NUMBER]-[SHORT_DESCRIPTION]` when naming your feature branches
- Use commit messages using the tags located in `commitlint.config.js`. You will most likely be using `feat`, `style`, `fix`, and `docs`. I.e `feat: [message]`
- Please run `yarn lint` and `yarn prettier` before committing (make sure yarn and prettier extensions are enabled in VSCode)
- It is highly recommended to use VSCode with ESLint and Prettier extensions
  - To save even more time, set up "Format on Save"

Congrats! You should now be set-up to work on Southface!! If you have any issues, don't hesitate to contact your EM.
