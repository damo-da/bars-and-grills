## Bars & Grills (frontend)

This project was bootstrapped using `create-react-app`. Visit https://create-react-app.dev/ for more info.


### Project setup
Source code is written using React, TypeScript, and Material UI. There are two run modes available, one fore `webapp` and the other for `admin-panel`.

### Setup
```shell script
$ node --version  # should be >12.16
v12.16.3
$ npm run test
$ npm run lint
$ npm install
```

### Webapp
To run the webapp,  
```shell script
$ npm start # this should run your application on localhost:3000
$ npm run build # static build for production
```

### Admin-panel
Admin panel was spearheaded by the [`react-admin`](https://marmelab.com/react-admin/Tutorial.html) package which allows us to seamless connect with Django API using [`ra-data-drf`](https://github.com/synaptic-cl/ra-data-drf/) package.
To run the webapp,  
```shell script
$ REACT_APP_PROJECT=admin-panel npm start # this should run your application on localhost:3000
$ REACT_APP_PROJECT=admin-panel npm run build # static build for production
$ npm run test
```

(To simplify this, you can add `REACT_APP_PROJECT` variable in a `.env.local` file.)

### Features
* No redux. (Tired of using the same thing over and over again? Let's keep simple apps simple.)
* End-to-end Material UI design for the sake of consistency.

Source code uses absolute imports for better readability.
https://medium.com/@ktruong008/absolute-imports-with-create-react-app-4338fbca7e3d


### License
See `../LICENSE` file for more info.
