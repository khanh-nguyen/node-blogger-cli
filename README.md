# node-blogger-cli
NodeJS tool to work with blogger's posts from command line.

# Setup
* Enable Blogger API. 
* Create Client ID for web application 
* Store CLIENT ID and CLIENT SECRET in BLOGGER_CLIENT_ID and BLOGGER_CLIENT_SECRET correspondingly
* Set the path to a file where you want to store ACCESS_TOKEN in BLOGGER_TOKEN_FILE. Eg: BLOGGER_TOKEN_FILE=$HOME/token.dat
* Set the path to redirect URI in BLOGGER_REDIRECT_URL
* Reload environment. Eg: `source ~/.bash_profile`

# Installation
```
npm install -g blogger-cli
```

# Authentication
```
blogger-cli auth
```

# Insert posts
```
blogger-cli post path/to/file1 path/to/file2 path/to/filen
blogger-cli post path/to/dir/*.*
blogger-cli post -p path/to/file
```
The first two commands insert drafts, while the latter one inserts, then publishes the post.

# List posts
```
blogger-cli list [--startDate date --endDate date --labels comma,separated,strings --status live/draft --maxResults n]
```
By default, `maxResults = 5`.

