Meteor.publish("projectListing", function () {
    return Projects.find({
        $or: [{
            owner: this.userId
        }, {
            contributors: this.userId
        }]
    }, {
        fields: {
            project_name: 1,
            owner: 1,
            contributors: 1,
            creation_date: 1
        }
    });
});

Meteor.publish('project', function (id) {
    var project = Projects.findOne(id);
    var cursors = [];
    if (project && (project.owner === this.userId || project.contributors.indexOf(this.userId) > -1)) {
        cursors.push(Projects.find(id));
        cursors.push(Hosts.find({
            projectId: id
        }));
        cursors.push(Ports.find({
            projectId: id
        }));
        cursors.push(Issues.find({
            projectId: id
        }));

    }
    return cursors;
});

Meteor.publish("directory", function () {
    if (this.userId) {
        return Meteor.users.find({}, {
            fields: {
                emails: 1,
                profile: 1,
                isAdmin: 1
            }
        });
    } else {
        return Meteor.users.find({}, {
            fields: {
                createdAd: 1
            }
        });
    }
});

Meteor.publish("settings", function () {
    return Settings.find();
});