Template.serviceNav.activeRouteClass = function () {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    var active = _.any(args, function (name) {
        return name === Router.current(true).route.name;
    });
    return active && 'active';
};

Template.serviceNav.projectId = function () {
    return Session.get('projectId');
};

Template.serviceNav.portId = function () {
    return Session.get('portId');
};
