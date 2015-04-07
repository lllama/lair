Template.hostServiceList.helpers({
    projectId: function () {
        return Session.get('projectId');
    },
    hostId: function () {
        return Session.get('hostId');
    },
    moreToShow: function () {
        return (Template.hostServiceList.total() > Session.get('hostServiceLimit'));
    },
    total: total,
    flagFilter: function () {
        return Session.get('portListFlagFilter');
    },
    services: function () {
        var limit = Session.get('hostServiceLimit') || 25;
        var query = {
            project_id: Session.get('projectId'),
            host_id: Session.get('hostId'),
            status: {
                $in: []
            }
        };
        if (Session.equals('portListFlagFilter', 'enabled')) {
            query.flag = true;
        }
        if (!Session.equals('portListStatusButtongrey', 'disabled')) {
            query.status.$in.push('lair-grey');
        }
        if (!Session.equals('portListStatusButtonblue', 'disabled')) {
            query.status.$in.push('lair-blue');
        }
        if (!Session.equals('portListStatusButtongreen', 'disabled')) {
            query.status.$in.push('lair-green');
        }
        if (!Session.equals('portListStatusButtonorange', 'disabled')) {
            query.status.$in.push('lair-orange');
        }
        if (!Session.equals('portListStatusButtonred', 'disabled')) {
            query.status.$in.push('lair-red');
        }
        var search = Session.get('portSearch');
        if (search) {
            query.$or = [{
                port: {
                    $regex: search,
                    $options: 'i'
                }
            }, {
                protocol: {
                    $regex: search,
                    $options: 'i'
                }
            }, {
                service: {
                    $regex: search,
                    $options: 'i'
                }
            }, {
                product: {
                    $regex: search,
                    $options: 'i'
                }
            }, {
                last_modified_by: {
                    $regex: search,
                    $options: 'i'
                }
            }];
        }
        return Ports.find(query, {
            limit: limit,
            sort: {
                port: 1
            }
        }).fetch();
    },
    searchTerm: function () {
        return Session.get('portSearch');
    },
    portListStatusButtonActive: function (status) {
        if (Session.equals('portListStatusButton' + status, 'disabled')) {
            return 'disabled';
        }
        return false;
    }
});

function total() {
    return Ports.find({
        project_id: Session.get('projectId'),
        host_id: Session.get('hostId')
    }).count();
}

Template.hostServiceList.events({
    'click .flag-enabled': function () {
        return Meteor.call('disablePortFlag', Session.get('projectId'), this._id);
    },

    'click .flag-disabled': function () {
        return Meteor.call('enablePortFlag', Session.get('projectId'), this._id);
    },

    'click #flag-filter-enable': function () {
        return Session.set('portListFlagFilter', 'enabled');
    },

    'click #flag-filter-disable': function () {
        return Session.set('portListFlagFilter', null);
    },

    'click .port-status-button': function (event) {
        var id = 'portListStatusButton' + event.target.id;
        if (Session.equals(id, null) || typeof Session.get(id) === 'undefined') {
            return Session.set(id, 'disabled');
        }
        return Session.set(id, null);
    },

    'keyup #port-search': function (event, tpl) {
        Session.set('portSearch', tpl.find('#port-search').value);
    },

    'click .port-status': function () {
        var status = STATUS_MAP[STATUS_MAP.indexOf(this.status) + 1];
        if (STATUS_MAP.indexOf(this.status) + 1 > 4) {
            status = STATUS_MAP[0];
        }
        return Meteor.call('setPortStatus', Session.get('projectId'), this._id, status);
    },

    'click #remove-ports': function () {
        var projectId = Session.get('projectId');
        var portIds = [];
        var inputs = $('.port-checked');
        inputs.each(function () {
            if ($(this).is(':checked')) {
                portIds.push($(this).attr('id'));
            }
        });
        portIds.forEach(function (id) {
            var port = Ports.findOne(id);
            var host = Hosts.findOne(port.host_id);
            Meteor.call('removePort', projectId, id, function (err) {
                if (!err) {
                    Meteor.call('removePortFromVulnerabilities', projectId, host.string_addr, port.port, port.protocol);
                }
            });
        });
    },

    'click #load-more': function () {
        var previousLimit = Session.get('hostServiceLimit') || 25;
        var newLimit = previousLimit + 25;
        Session.set('hostServiceLimit', newLimit);
    },

    'click #load-all': function () {
        Session.set('hostServiceLimit', 65535);
    }
});
