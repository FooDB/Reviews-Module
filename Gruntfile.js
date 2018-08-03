module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-aws');
    // Project configuration.
    grunt.initConfig({
      aws: grunt.file.readJSON('credentials.json'),
      s3: {
        options: {
          accessKeyId: '<%= aws.accessKeyId %>',
          secretAccessKey: '<%= aws.secretAccessKey %>',
          bucket: 'fec-reviews-cloud-host',
          region: 'us-west-1',
        },
        build: {
          cwd: 'public/',
          src: 'bundle.js',
        }
      }
    });
  
  };