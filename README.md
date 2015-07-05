child
=====

Minimalistic nodejs process manager.


## Main Features
- Simple & Lightweight (70 LOC)
- No dependencies


## Api

### Constructor

```js
var apacheTail = require('child')({
	// Command to execute
	command: '/usr/bin/tail',
	// [Optional] Command arguments (same as nodejs.org/api/child_process.html)
	args: ['-f', '/var/log/apache2/access.log'],
	// [Optional] Extra Options (same as nodejs.org/api/child_process.html)
	options: [],
	// [Optional] Auto restart?
	autoRestart: false,
	// [Optional] Timeout beetwen restart's
	restartTimeout: 200,
	// [Optional] Callback when the process is Auto-restarted
	cbRestart: function(data){ console.log('restart '+data)},
	// [Optional] On Output
	cbStdout: function(data){ console.log('out '+data)},
	// [Optional] On Error
	cbStderr: function(data){ console.log('err '+data)},
	// [Optional] On Exit
	cbClose: function(exitCode){ console.log('bye '+exitCode)},
})
```

### .start(callback)
```js
apacheTail.start(function(pid){ console.log('apacheTail is now up with pid: '+ pid) })
```

### .stop(callback, termSignal)
```js
apacheTail.stop(function(code){ console.log('apacheTail is now stopped') })
```

### .restart(callback, termSignal)
```js
apacheTail.restart(function(code){ console.log('apacheTail has restarted') })
```


---
## License

(The MIT License)

Copyright (c) 2010-2015 Hugo Rodrigues
https://hugorodrigues.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
