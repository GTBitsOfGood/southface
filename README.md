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

## Running with Docker (recommended):

3. Install docker and docker-compose

MacOS: [Docker Desktop for MacOS](https://docs.docker.com/desktop/install/mac-install/)
Windows: [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
Linux: [Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)

4. Obtain your secrets -- Linux or MacOS (Skip if Windows); you will need to obtain a password from your Engineering Manager:

First, install BitWarden CLI and FX with npm

```
npm install -g @bitwarden/cli fx
```

Or, if you're using Homebrew,

```
brew install bitwarden-cli fx
```

Now fetch the secrets from BitWarden

```
yarn secrets:linux
```

4. Obtain your secrets -- Windows Machines (Skip if MacOS or Linux); you will need to obtain a password from your Engineering Manager:

First, install BitWarden CLI and FX with npm

```
npm install -g @bitwarden/cli fx
```

Now fetch the secrets from BitWarden

```
yarn secrets:windows
```

Contact your EM for the Bitwarden password. **NEVER EVER** commit `.env.local` to your version control system.

5. Run the dev enviromnent, build, etc.

To run the dev environment, run the default command.

```
docker-compose up --build
```

To run build or any other script specified in the package.json, provide the YARN_COMMAND environment variable before the command.

```
YARN_COMMAND=build docker-compose up --build
```

### Development

- Run `docker-compose up --build`

### Production

- Run `YARN_COMMAND=start docker-compose up --build`

## Running outside of Docker (not recommended):

3. Install Node Version Manager (NVM)

- follow [this guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) if you don't have NVM already to install it onto your machine.

4. Switch to node version 16.X

```
nvm install 16 && nvm use 16
```

5. Install the dependencies (make sure to use yarn and not npm):

```
yarn
```

4. Obtain your secrets -- Linux or MacOS (Skip if Windows); you will need to obtain a password from your Engineering Manager:

First, install BitWarden CLI with npm

```
npm install -g @bitwarden/cli
```

Or, if you're using Homebrew,

```
brew install bitwarden-cli
```

Now fetch the secrets from BitWarden

```
yarn secrets:linux
```

4. Obtain your secrets -- Windows Machines (Skip if MacOS or Linux); you will need to obtain a password from your Engineering Manager:

First, install BitWarden CLI with npm

```
npm install -g @bitwarden/cli
```

Now fetch the secrets from BitWarden

```
yarn secrets:windows
```

Contact your EM for the Bitwarden password. **NEVER EVER** commit `.env.local` to your version control system.

### Development

- Run `yarn dev`

### Production

- Run `yarn start`

## MongoDB

If you're using Docker, Docker will run MongoDB inside its container. If you aren't, you'll have to run it yourself. Installing MongoDB Compass will allow you to do that. Regardless, download it so you can view the remote database from your machine.

- Download [MongoDB compass](https://www.mongodb.com/try/download/compass)
- Launch MongoDB Compass. When prompted for the connection URL, copy and paste `DB_URL` from your `.env.local` file.

You should now have write access to the different collections available.

## Running

To understand this code better, read the [Code Tour](/CODETOUR.md).

## Additional Information

- Use `[INITIALS]/[ISSUE_NUMBER]-[SHORT_DESCRIPTION]` when naming your feature branches
- Use commit messages using the tags located in `commitlint.config.js`. You will most likely be using `feat`, `style`, `fix`, and `docs`. I.e `feat: [message]`
- Please run `yarn lint` and `yarn prettier` before committing (make sure yarn and prettier extensions are enabled in VSCode)
- It is highly recommended to use VSCode with ESLint and Prettier extensions
  - To save even more time, set up "Format on Save"

Congrats! You should now be set-up to work on Southface!! If you have any issues, don't hesitate to contact your EM.
