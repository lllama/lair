Template.droneLog.helpers({
    logs: function () {
        var project = Projects.findOne(Session.get('projectId'));
        if (!project) {
            return {};
        }
        var l = project.drone_log;
        l.sort();
        l.reverse();
        return l;
    },
    commands: function () {
        var project = Projects.findOne(Session.get('projectId'));
        if (!project) {
            return {};
        }
        var commands = [];
        project.commands.forEach(function (command) {
            commands.push({
                tool: command.tool,
                command: command.command
            });
        });
        return commands;
    }
});
