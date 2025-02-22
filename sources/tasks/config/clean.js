module.exports = (grunt) => {
    grunt.config.set('clean', {
        dist: {
            files: [
                {
                    dot: true,
                    src: '<%= config.dist %>',
                },
            ],
        },
    });
};
