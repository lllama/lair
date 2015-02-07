Template.project.project = function () {
    var project = null;
    if (Session.equals('projectId', null)) {
        project = Projects.findOne();
        if (!project) {
            return false;
        }
        Session.set('projectId', project._id);
    }
    project = Projects.findOne(Session.get('projectId'));
    if (!project) {
        return false;
    }
    Session.set('projectId', project._id);
    Session.set('hostChartData', hostData);
    Session.set('vulnerabilityChartData', vulnerabilityData);
    project.isOwner = project.owner === Meteor.userId();
    project.contributors = Meteor.users.find({
        "_id": {
            $in: project.contributors
        }
    }).fetch();
    project.owner = Meteor.users.findOne(project.owner).emails[0].address;
    return project;
};

Template.project.projectId = function () {
    return Session.get('projectId');
};

Template.project.events({
    'click #export-local': function () {
        var projectId = Session.get('projectId');
        //var data = prepareExport(projectId);
        Meteor.call('downloadProject', Session.get('projectId'), function (err, res) {
            if (err) {
                return Alerts.insert({
                    "class": "alert-error",
                    "strong": "Error",
                    "message": "Download Failed"
                });
            }
            var blob = new Blob([JSON.stringify(res, null, 4)], {
                type: "text/plain;charset=utf-8"
            });
            saveAs(blob, projectId + ".json");
            return Alerts.insert({
                "class": "alert-success",
                "strong": "Success",
                "message": "Download Complete"
            });
        });

    },

    'click #export-project': function (event, tpl) {
        var url = tpl.find('[name=url]').value;
        var username = tpl.find('[name=username]').value;
        var password = tpl.find('[name=password]').value;
        Meteor.call('exportProject', Session.get('projectId'), url, username, password, function (err) {
            if (err) {
                return Alerts.insert({
                    "class": "alert-error",
                    "strong": "Error",
                    "message": "Export Failed"
                });
            }
            return Alerts.insert({
                "class": "alert-success",
                "strong": "Success",
                "message": "Export Complete"
            });
        });
    },

    'click #remove-project': function () {
        return Meteor.call('removeProject', Session.get('projectId'), function (err) {
            Session.set('projectId', null);
            if (err) {
                Alerts.insert({
                    "class": "alert-error",
                    "strong": "Error",
                    "message": err.reason
                });
            }
        });
    },

    'click #leave-project': function () {
        return Meteor.call('removeContributor', Session.get('projectId'), Meteor.userId(), function (err) {
            Session.set('projectId', null);
            if (err) {
                Alerts.insert({
                    "class": "alert-error",
                    "strong": "Error",
                    "message": err.reason
                });
            }
        });
    },
});
