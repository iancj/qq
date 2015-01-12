module.exports = function(grunt) {
    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        transport: {
            options: {
                paths:['src'],
                alias: '<%= pkg.spm.alias %>',
                parsers:{
                    '.js' : [script.jsParser],
                    '.tpl' : [text.html2jsParser]
                }
            },
            component: {
                options: {
                    idleading: 'component/'
                },
                files: [{
                    expand: true,
                    cwd: 'src/component/',
                    src: ['**/*.js'],
                    dest: '_build/component/'
                }]
            },
            js: {
                options: {
                    idleading: 'js/'
                },
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: '**/*.js',
                    dest: '_build/js/'
                }]
            },
            tpl: {
                options: {
                    idleading: 'tpl/'
                },
                files: [{
                    expand: true,
                    cwd: 'src/tpl/',
                    src: '**/*.tpl',
                    dest: '_build/tpl/'
                }]
            }
        },
        concat: {
            js: {
                options: {
                    include: 'relative'
                },
                files: [{
                    expand: true,
                    cwd: '_build/js/',
                    src: ['**/*.js'],
                    dest: 'dist/js/',
                    ext: '.js'
                }]
            },
            tpl: {
                options: {
                    include: 'relative'
                },
                files: [{
                    expand: true,
                    cwd: '_build/tpl/',
                    src: ['**/*.tpl.js'],
                    dest: 'dist/tpl/'
                }]
            }
        },
        copy:{
            component: {
                files: [{
                    expand: true,
                    cwd: '_build/component/',
                    src: ['**/*.js'],
                    dest: 'dist/component/',
                    ext: '.js'
                }]
            },
            main: {
                files: [
                    {
                        expand: true, // Enable dynamic expansion
                        cwd: 'src/', // Src matches are relative to this path
                        src: ['gallery/**/*.*','seajs/**/*.*'], // Actual patterns to match
                        dest: 'dist/', // Destination path prefix
                        filter: "isFile"
                    }
                ]
            }
        },
        uglify: {
            main: {
                expand: true,
                cwd: 'dist',
                src: ['**/*.js', '!**/*-debug.js'],
                dest: 'dist'
            }
        },
        cssmin: {
            gallery: {
                expand: true,
                cwd: 'dist',
                src: ['gallery/**/*.css'],
                dest: 'dist'
            },
            component: {
                expand: true,
                cwd: 'src',
                src: ['component/**/*.css'],
                dest: 'dist'
            },
            app: {
                files: {
                    'dist/css/app/app.css': [
                        'src/css/reset.css',
                        'src/css/module/*.css'
                    ]
                }
            }
        },
        imagemin: {
            component: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'src/component/', // Src matches are relative to this path
                    src: ['**/*.{jpg,png,gif}'], // Actual patterns to match
                    dest: 'dist/component/', // Destination path prefix
                    filter: "isFile"
                }]
            },
            main: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'src/images/', // Src matches are relative to this path
                    src: ['**/*.{jpg,png,gif}'], // Actual patterns to match
                    dest: 'dist/images/', // Destination path prefix
                    filter: "isFile"
                }]
            }
        },
        clean: {
            "beforeBuild": ['dist'], //构建之前先删除旧版文件
            "build": ['_build'], //transport临时目录
            "noDebugJS": ['dist/**/*-debug.js','dist/**/*-debug.tpl.js'] //删除debug文件
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean:build', 'clean:noDebugJS']);
    grunt.registerTask('build-img', ['imagemin']);
    grunt.registerTask('build-css', ['cssmin']);
    grunt.registerTask('build-js', ['uglify']);
    grunt.registerTask('build-copy', ['copy']);
    grunt.registerTask('build-trans', ['clean:build','transport']);
    grunt.registerTask('build', ['clean:beforeBuild', 'transport','concat', 'copy','uglify', 'cssmin', 'imagemin','clean:build','clean:noDebugJS']);
};
