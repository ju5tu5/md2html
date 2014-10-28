(function(global) {
	'use strict';
	
	// Build a singleton for Md2Html
	function Md2Html() {
		if(Md2Html.prototype._singletonInstance) {
			return Md2Html.prototype._singletonInstance;
		}
		Md2Html.prototype._singletonInstance = this;
		
		// export this.parse to the global namespace
		this.parse = parse;
	};
	// Set md2html in the global namespace
	global.md2html = new Md2Html();

	// Take a markdown string and return a semantic HTML5 string
	function parse (md) {
		return toChunks(md).map(parseChunk);//.join('\n\n');
	}

	// Take a string, split it into an array on double newline chars and return the array
	function toChunks (string) {
		return string.split(/\n\n/);
	}

	function parseChunk (chunk) {
		//var foo = condition(/^#{1}\s/, function (x) {return '<h1>'+x.substr(2,x.length)+'</h1>'});
		return header(chunk);
	}

// MARKDOWN DIALECT PARSERS, i will abstract out those vars, i promise...

	// Doesn't do setext style.. got to add it.. (T.T) more regexps...
	var header = parser(/^(\#{1,6})([^\#\n]+)$/m, function (prev, curr, i, arr) {
		return '<h'+arr[1].length+'>'+arr[2].trim()+'</h'+arr[1].length+'>';
	});

	var code = parser(/\s\`\`\`\n?([^`]+)\`\`\`/g, function (prev, curr, i, arr) {
		console.log('got one!');
		return '<code>'+arr[2].trim()+'</code>';
	});


	// Return a function that executes fun on x when pattern is satisfied, pattern being a regexp
	function parser (regex, fun) {
		return function (string) {
			return regex.test(string) ? regex.exec(string).reduce(fun) : string;
		}
	}


// HIGHER ORDER FUNCTIONS

// 	function dispatch (/* functions */) {
// 		var funs = _.toArray(arguments);
// 		var size = functions.length;

// 		return function(target /*, arguments */) {
// 			var ret = undefined;
// 			var args = _.rest(arguments);

// 			for(var funIndex=0; funIndex < size; funIndex++) {
// 				var fun = funs[funIndex];
// 				ret = fun.apply(fun, construct(target, args));
// 				if(existy(ret)) return ret;
// 			}
// 			return ret;
// 		};
// 	}

// 	// Take a method and return a function that will invoke that method on any object given.
// 	function invoker(NAME, METHOD) {
// 		return function (target /* arguments */) {
// 			if(!existy(target)) fail("Must provide a target");
// 			var targetMethod = target[NAME];
// 			var args = _.rest(arguments);

// 			return doWhen((existy(targetMethod) && METHOD === targetMethod), function () {
// 				return targetMethod.apply(target, args);
// 			});
// 		};
// 	}

// 	// function dispatch(/* functions */) {
// 	// 	var funs = _.toArray(arguments)
// 	// }

// // HELPER FUNCTIONS
// 	function existy (x) { return x != null }

// 	function fail(thing) { throw new Error(thing); }
// 	function warn(thing) { console.log(["WARNING:", thing].join(' ')); }
// 	function note(thing) { console.log(["NOTE:", thing].join(' ')); }

}(window));
