(function(location) {
  if (location.search[1] === '/' ) {
    var decoded = location.search.slice(1).split('&').map(function(s) { 
      return s.replace(/~and~/g, '&')
    }).join('?');
    window.history.replaceState(null, null,
        location.pathname.slice(0, -1) + decoded + location.hash
    );
  }
}(window.location))