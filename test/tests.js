(function() {

	module('md2html');

	test('Required vars and functions are available', function (assert) {
		assert.notEqual(md2html, undefined, 'Global variable md2html exists');
		assert.notEqual(md2html.parse, undefined, 'Function md2html.parse() is publicly available')
		assert.equal(md2html.toChunks, undefined, 'Function md2html.toChunks() is private')
	});

}());