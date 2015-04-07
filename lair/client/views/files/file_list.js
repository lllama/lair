Template.fileList.helpers({
    files: function () {
        var project = Projects.findOne(Session.get('projectId'));
        if (!project) {
            return false;
        }
        return project.files.sort();
    }
});

Template.fileList.events({
    'submit form': function (event, tpl) {
        event.preventDefault();
        var projectId = Session.get('projectId');
        var name = tpl.find('[name=file-name]').value;
        var url = tpl.find('[name=file-url]').value;

        Meteor.call('addFile', projectId, name, url, function (err) {
            if (err) {
                return Alerts.insert({
                    class: 'alert-warning',
                    strong: 'Error',
                    message: err.reason
                });
            }
            tpl.find('[name=file-name]').value = '';
            tpl.find('[name=file-url]').value = '';
        });
    },

    'click #remove-files': function () {
        var projectId = Session.get('projectId');
        var fileIds = [];
        var inputs = $('.file-checked');
        inputs.each(function () {
            if ($(this).is(':checked')) {
                fileIds.push($(this).attr('id'));
            }
        });
        fileIds.forEach(function (id) {
            var parts = id.split('@');
            Meteor.call('removeFile', projectId, parts[0], parts[1]);
        });
    }
});
