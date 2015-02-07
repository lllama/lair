Template.hostNav.activeRouteClass = function () {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    var active = _.any(args, function (name) {
        return name === Router.current(true).route.name;
    });
    return active && 'active';
};

Template.hostNav.projectId = function () {
    return Session.get('projectId');
};

Template.hostNav.hostId = function () {
    return Session.get('hostId');
};
