$(window).on('load', function(){
    const isRoot = location.pathname == "/";
    const saved = location.pathname == "/saved";

    console.log(location.pathname)
    
    if (isRoot) {
        console.log(`WE'RE HACKING THE MAINFRAME!!!`)
        $.getJSON('/all', function(data) {
            console.log(data)
            data.forEach(e => {
                $('.main-bod').append(`
                    <div class="row article-row" data-id="${e._id}">
                        <div class="col s12 m8 offset-m2 l6 offset-l3">
                            <div class="card hoverable">
                                <div class="card-image">
                                    <a href="${e.link}">
                                        <img src="${e.img}">
                                        <span class="card-title">${e.title}</span>
                                    </a>
                                    <a class="btn-floating halfway-fab waves-effect waves-light red hoverable"><i class="material-icons">add</i></a>
                                </div>
                                <a href="${e.link}">
                                    <div class="card-content">
                                        <p>${e.summary}</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                `);
            });
        });
    }

    if (saved) {
        console.log(`WE'RE HACKING THE MAINFRAME!!!`)
        $.getJSON('/getSaved', function(data) {
            console.log(data)
            data.forEach(e => {
                $('.main-bod').append(`
                    <div class="row article-row" data-id="${e._id}">
                        <div class="col s12 m6 offset-m3 l4 offset-l4 ">
                            <div class="card hoverable">
                                <div class="card-image">
                                    <a href="${e.link}">
                                        <img src="${e.img}">
                                        <span class="card-title">${e.title}</span>
                                    </a>
                                    <a class="btn-floating halfway-fab waves-effect waves-light red hoverable"><i class="material-icons">add</i></a>
                                </div>
                                <a href="${e.link}">
                                    <div class="card-content">
                                        <p>${e.summary}</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                `);
            });
        });
    }
})