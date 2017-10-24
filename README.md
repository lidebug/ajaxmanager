# ajaxmanager
### v1.1.0 ( last update: 24 oct 2017 )

Manager to simplify the receiving and responding of post requests.

### Install
```javascript
npm i ajaxmanager --save
```

### Node.js
```javascript
var ajaxmanager = require("ajaxmanager");
```

### Initialization
```javascript
var ajax = ajaxmanager.create();
ajax.set({
  req: req,
  res: res
});
```

### DB
```javascript
ajax.set({ db: db });
```

### Errors
Set error and end session
```javascript
ajax.error("wrong data");
```

Add more that one error
```javascript
ajax.adderror("Error 1");
ajax.adderror("Error 2");
ajax.adderror("Error 3");
```

### Completion
When everything is done
```javascript
ajax.success(); // response = { error: false };
```

Send file
```javascript
ajax.reply(file); // response = { error: false, pkg: file};
```

Send file instead everything else
```javascript
ajax.send(file); // response = file
```