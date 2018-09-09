$(window).on('load', function(){
    const isRoot = location.pathname == "/";
    
    if (isRoot) {
        console.log(`WE'RE HACKING THE MAINFRAME!!!`)
        $.ajax({
            method: "GET",
            url: "/scrape"
          }).then(function(){
              console.log('something');
          });
    }
})