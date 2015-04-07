Template.sideNav.helpers({
    projectId: function () {
        return Session.get('projectId');
    },
    activeRouteClass: function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();
        var active = _.any(args, function (name) {
            return name === Router.current(true).route.name;
        });
        return active && 'active';
    }
});
