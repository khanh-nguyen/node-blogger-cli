# node-blogger-cli
Blogger's commandline tools in NodeJS

# Setup
* Enable Blogger API. 
* Create Client ID for web application 
* Store CLIENT ID and CLIENT SECRET in BLOGGER_CLIENT_ID and BLOGGER_CLIENT_SECRET correspondingly
* Set the path to a file where you want to store ACCESS_TOKEN in BLOGGER_TOKEN_FILE. Eg: BLOGGER_TOKEN_FILE=$HOME/token.dat
* Set the path to redirect URI in BLOGGER_REDIRECT_URL
* Reload environment. Eg: `source ~/.bash_profile`

# Authentication
```
blogger-cli auth
```

# Insert post
```
blogger-cli post path/to/file
blogger-cli post -p path/to/file
```

The first command inserts draft, while the latter one inserts, then publishs the post.

# TODO:
* Implement setup steps
* Add more functionality. Eg: list posts, update posts, delete posts, etc.
* Publish multiple posts at once. 
