// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    var homeTpl = Handlebars.compile($('#home-tpl').html());
    var employeeTpl = Handlebars.compile($('#employee-tpl').html());
    var employeeLiTpl = Handlebars.compile($('#employee-li-tpl').html());

    var detailsURL = /^#employees\/(\d{1,})/;

    var adapter = new LocalStorageAdapter();
    adapter.initialize().done(function () {
        route();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function(){
        $(window).on('hashchange', route);
    }, false);

    /* --------------------------------- Local Funcions -------------------------------- */
    function route() {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(adapter, homeTpl, employeeLiTpl).render().el);
            return;
        }
        var match = hash.match(detailsURL);
        if (match) {
            adapter.findById(Number(match[1])).done(function(employee) {
                $('body').html(new EmployeeView(adapter, employeeTpl, employee).render().el);
            });
        }
    }


}());