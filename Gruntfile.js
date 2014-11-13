module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            page:{
                expand:true,
                cwd: 'js/',
                src: ['**/*.js','!dist/**/*.js','!plugins/*.js'],
                dest:"js/dist",
                ext:".js"
            }
        },
        cssmin:{
            qq: {
                files: {
                    'css/qq-min.css': ['css/*.css',"!css/mobilebone.css"],
                    'css/mobilebone-min.css': ['css/mobilebone.css']
                }
            }
        },
        copy:{
            qq:{
                files:[
                    {
                        expand:true,
                        cwd: 'js/',
                        src: ['plugins/*.*'],
                        dest:"js/dist"
                    }
                ]
            }
        },
        watch: {
            css: {
                files: ['**/*.css','!**/*-min.css'],
                tasks:['cssmin']
            },  
            js:{
                files:['**/*.js','!**/*-min.js'],
                tasks:['uglify']
            },
            html: {
                files: ['*.html']
            },
            options: {
                livereload: 8080
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // resgister tasks
    grunt.registerTask('wh', ['watch']);
    grunt.registerTask('build', ['cssmin']);

};