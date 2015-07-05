module.exports = function(userOptions) {

	var obj = {},
		process = {},
		stopCb,
		stopOrder = false

	var options = {
		command: userOptions.command || false,
		args: userOptions.args || null,
		options: userOptions.options || [],

		autoRestart: userOptions.autoRestart || false,
		restartTimeout: userOptions.restartTimeout || 200,

		cbRestart: userOptions.cbRestart || function(data) {},

		cbStdout: userOptions.cbStdout || null,
		cbStderr: userOptions.cbStderr || null,
		cbClose: userOptions.cbClose || function(data) {},
	}

	obj.start = function(cb) {
		stopOrder = false;
		process = require('child_process').spawn(options.command, options.args, options.options);

		if (options.cbStdout)
			process.stdout.on('data', options.cbStdout)

		if (options.cbStderr)
			process.stderr.on('data', options.cbStderr)

		process.on('close', function(code) {

			// Default close cb
			options.cbClose(code)

			// Stop CB ?
			if (stopOrder == true)
				stopCb(code);

			// Auto-restarting ?
			if (stopOrder == false && options.autoRestart == true) {
				// AutoRestart CB
				options.cbRestart(code)
				setTimeout(obj.start, options.restartTimeout)
			}
		})

		if (cb)
			cb(process.pid)

	}

	obj.stop = function(cb, termSignal) {
		stopOrder = true
		stopCb = cb || function() {}
		process.kill(termSignal || 'SIGTERM')
	}

	obj.restart = function(cb, termSignal) {
		// Stop
		obj.stop(function() {

			// Wait and start again
			setTimeout(function() {
				obj.start();
				if (cb) cb();
			}, options.restartTimeout);

		}, termSignal);
	}

	return obj;
}