## Setting up a dev environment

Assuming you have [the latest nodejs installed](https://nodejs.org/en/) and proper access to the github repository then getting the MySageSure website running in your development environment is just a matter of running the following few commands...

#### 1. pull down a local copy of all the files

```
git clone https://github.com/icg360/keystone-ui.git
```

#### 2. navigate to `./keystone-ui` and run `npm install`

```
$ npm install
```

#### 3. setup your environment variables

Copy the `.env.example` file to a new file named `.env`. Update environment variables to the appropriate values (Ask Liam if you have questions about this). **NOTE:** Setting `NODE_ENV=production` requires running an instance of [redis](http://redis.io/).


#### 4. start the development server

```
$ npm start
```

then navigate to [http://localhost:3000](http://localhost:3000)

-----

## Building the MySageSure website release

It's a good idea to clear the `node_modules` directory and do a fresh install for each release.

#### Updating dependencies and building the static assets

```
$ rm -rf node_modules && npm install && npm build
```
Be sure to set `NODE_ENV=production` and have a running instance of redis available for the Express session store. Currently, the redis client is configured to use the default redis port and host settings. You will also need to have set the `SESSION_SECRET` and `KEYSTONE_API_HREF` environment vars (See the `.env.example` file).

Once all of that is in place, you can run the application with the following command:

```
$ node ./bin/www
```

#### Other things to consider

Daemonizing and monitoring the application with [Upstart & Monit](http://howtonode.org/deploying-node-upstart-monit) or something comparable may also be a *very* good idea.
