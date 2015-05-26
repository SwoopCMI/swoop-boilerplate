#Swoop-boilerplate

I really dislike setting up build scripts. Most of the time I want to do the exact same thing:

While developing:

  - easy to setup and run dev server
  - transpile ES6+, JSX, code
  - hotload (a.k.a. live reload) modules when changed

When ready to ship:

  - minify and bundle all the things
  - output minfied, uniquely named static files into public directory
  - be able to generate/customized static HTML file(s) used to deliver my JS app

[webpack](http://webpack.github.io) and the [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) can do most of those things pretty well out of the box. But, it sure is a pain to set it all up.

So, this is just a simplified, opinionated way to configure webpack for development and then build for production. That also supports easily generating more files.

If no one uses it but me, it will have still served its purpose.

## Usage

**Step 1. Create/install it into your project**

```
npm init
npm install -g webpack
npm install swoopcmi/swoop-boilerplate
mkdir static && mkdir source
```

**Step 2. Create a webpack.config.js**

Put it at the root of your project, a typical config looks something like this:

```js
var getConfig = require("swoop-boilerplate");
var env = process.env.NODE_ENV || "development";

module.exports = getConfig({
  // a boolean specifying whether to minify, output files, etc
  isDev: env === "development",
  // entry point for the app
  in: "source/app.js"
});

```

**Step 3. Configure `scripts` section of package.json**

I usually add something like the following scripts:

```
"scripts": {
  "start": "webpack-dev-server"
}
```

Assuming you've got some JS written that you've set as your `in` in the `webpack.config.js` you can run `npm start` and open a browser to `http://localhost:3000` and you everything should Just Work™.  

When you're wanting to do a build, just run `npm run build`. The build will generate your files into `public`.  

Now there's a static site in `public`  


**note about `peerDependencies`**

swoop-boilerplate specifies many of its dependencies as `peerDependencies` in order to let you decide which version of, say, babel or React that you want to use in your project without us specifying that directly for you.

In npm `3.x.x` `peerDependencies` will no longer be installed by default.

When this happens, you'll want to run the following to install the related dependencies as well.

Included here for your copy/paste enjoyment:

```
npm i --save webpack-dev-server
```

## Config options

The main export you get when you `require("swoop-boilerplate")` is simply a pre-configured `webpack.config.js`. You could take the result of that and add other plugins if you so chose, but shouldn't be necessary for most common tasks.

### `in`

This should just be the path to the file that serves as the main entry point of your application.

### `out`

Path to directory where we're going to put generated files.

### `isDev`

A boolean to indicate whether or not everything is in production mode (minified, etc.) or development mode (everything hotloaded and unminified).


## Additional goodies
  
## Developing on multiple devices at once

If you're building an app that you want to look good on all devices it's nice to be able to run them all at once.

Hotloading makes this extremely nice and convenient.

If you're on a mac, this is fairly simple. Just add a `hostname` option to your config like so:

```js
var getConfig = require("swoop-boilerplate");
var env = process.env.NODE_ENV || "development";

module.exports = getConfig({
    isDev: env === 'development',
    in: 'src/app.js',
    out: 'public',

    // set this to whatever your machine name is
    // plus `.local`
    // my machine is `loki` so I do:
    hostname: 'loki.local'
})
```

Now when you run the development instead of going to localhost open: `http://{{yourmachine}}.local:3000` on any device that's on your local network, they should all connect and all hotload your style and JS changes.

## License

MIT

## Credits
All this is possible, thanks to the original author [@HenrikJoreteg](http://twitter.com/henrikjoreteg) who published the basis for this boilerplate to https://github.com/henrikjoreteg/hjs-webpack
