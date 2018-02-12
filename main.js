(function (d, n, w) {
	function stringifyProperty(prop) {
		if (typeof n[prop] === 'function') {
			return JSON.stringify(n[prop]());
		}

		if (prop === 'mimeTypes') {
			var types = [];

			for (var i = 0; i < n.mimeTypes.length; i++) {
				types.push({
					description: n.mimeTypes[i].description,
					type: n.mimeTypes[i].type
				});
			}

			return JSON.stringify(types);
		}

		if (prop === 'plugins') {
			var plugins = [];

			for (var i = 0; i < n.plugins.length; i++) {
				var mimeTypes = [];

				for (var j = 0; j < n.plugins[i].length; j++) {
					mimeTypes.push({
						type: n.plugins[i][j].type,
						description: n.plugins[i][j].description
					});
				}

				plugins.push({
					name: n.plugins[i].name,
					description: n.plugins[i].description,
					mimeTypes: mimeTypes
				});
			}

			return JSON.stringify(plugins);
		}

		return JSON.stringify(n[prop]);
	}

	function setUserAgent() {
		d.getElementById('user-agent').innerHTML = n.userAgent;
	}

	function setSizes() {
		var devicePixelRatio = window.devicePixelRatio || 1;

		d.getElementById('screen-width').innerHTML = screen.width * devicePixelRatio;
		d.getElementById('screen-height').innerHTML = screen.height * devicePixelRatio;
		d.getElementById('window-width').innerHTML = window.innerWidth;
		d.getElementById('window-height').innerHTML = window.innerHeight;

		if (devicePixelRatio !== 1) {
			d.getElementById('pixel-ratio').innerHTML = '(' + screen.width + '×' + screen.height + '@' + devicePixelRatio + 'x)';
		}
	}

	function setNavProps() {
		var navList = d.getElementById('navprops');
		var navProps = [];

		for (prop in n) {
			navProps.push(prop);
		}

		navProps = navProps.sort();

		for (var i = 0, length = navProps.length; i < length; i++) {
			if (navProps[i] === 'userAgent') {
				continue;
			}

			try {
				navList.innerHTML += ('<li>' + navProps[i] + ': <strong>' + stringifyProperty(navProps[i]) + '</strong></li>');
			} catch (e) {
				//
			}
		}
	}

	setUserAgent();
	setSizes();
	setNavProps();

	w.addEventListener('orientationchange', setSizes);
	w.addEventListener('resize', setSizes);

})(document, navigator, this);
