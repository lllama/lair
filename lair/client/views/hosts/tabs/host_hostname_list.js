Template.hostHostnameList.helpers({
    projectId: function () {
        return Session.get('projectId');
    },
    hostId: function () {
        return Session.get('hostId');
    },
    hostnames: function () {
        var host = Hosts.findOne(Session.get('hostId'));
        if (!host) {
            return false;
        }
        return host.hostnames;
    },
    links: function () {
        var projectId = Session.get('projectId');
        var hostId = Session.get('hostId');
        var host = Hosts.findOne(hostId);
        if (!host) {
            return {};
        }
        var linkList = [];
        var names = host.hostnames;
        var query = {
            project_id: projectId,
            host_id: hostId
        };
        query.service = {
            $regex: 'web|www|ssl|http|https',
            $options: 'i'
        };
        var ports = Ports.find(query).fetch();
        ports.forEach(function (port) {
            var protocol = 'http://';
            if (port.service.match(/(ssl|https)/gi) || port.port === 443 || port.port === 8443) {
                protocol = 'https://';
            }
            linkList.push(protocol + host.string_addr + ':' + port.port);
            names.forEach(function (n) {
                linkList.push(protocol + n + ':' + port.port);
            });
        });
        return linkList.sort();
    }
});

Template.hostHostnameList.events({
    'click #remove-hostnames': function () {
        var projectId = Session.get('projectId');
        var hostId = Session.get('hostId');
        var hostnameIds = [];
        var inputs = $('.hostname-checked');
        inputs.each(function () {
            if ($(this).is(':checked')) {
                hostnameIds.push($(this).attr('id'));
            }
        });
        hostnameIds.forEach(function (id) {
            Meteor.call('removeHostname', projectId, hostId, id);
        });
    }
});
