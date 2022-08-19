
# junkbot-game-server
A Node-based server for the Junkbot game

## Dev Stack (8/12/22)
VS Code
Node.js
Express *

## Dev Dependenccies (8/14/22)
DotEnv (for local environment variable config)
Typescript
ts-jest (unit testing)
ts-standard (linting)

_For module versions, see package.json_

## Environment Variables 
* For local development, we use dotenv.  Create a .env file in your project's root dir and load it with the following (as of 08/19/22) *

    # App basics
    APP_NAME="Junkbot Game Server"
    HTTP_PORT="8080"

    # Logging config
    LOG_LEVEL=5 # none = 0, error = 1, warn = 2, info = 3, debug = 4, trace = 5
    LOG_COLORS="true" # true or false
    
    # General values
    NODE_ENV="development" # set to "production" in prod (duh)
    
    # Keys for testing invalid configuration values
    TEST__INVALID_NUMERIC="NOT_A_NUMBER"
    TEST__INVALID_BOOLEAN="NOT_A_BOOLEAN" (edited)

## TODO
- Copy this stuff to Trello...
- Create route handler
- Add Socket IO (derald?)
- Add database integration?
- Github Actions (james)
- Create env variable class / handler
- Determine logging solution (could use the one from MazeMaster?)
- Integrate logging solution
- Integrate SonarCloud (james)

