
Array.from( document.getElementsByTagName( 'visitor-counter' ) )
    .forEach( visitorCounter => {
        const serviceUrl = `${visitorCounter.getAttribute( 'src' )}?forResource=${encodeURI(window.location.href.replace('http://localhost:8080', 'https://www.paulsawesomesiteforcoolpeople.com'))}`;
        fetch( serviceUrl )
            .then( response => response.json() )
            .then( response => response.visitCount )
            .then( visitCount => visitorCounter.innerHTML = `<span class="count">${visitCount}</span> <span class="label">cool visitors</span>` )
    } );