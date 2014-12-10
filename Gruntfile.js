module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        transport: {
            options: {
                paths:['src'],
                alias: '<%= pkg.spm.alias %>'
            },
            component: {
                options: {
                    idleading: 'component/'
                },
                files: [{
                    expand: true,
                    cwd: 'src/component/',
                    src: '**/*.js',
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
            component: {
                options: {
                    include: 'relative'
                },
                files: [{
                    expand: true,
                    cwd: '_build/component/',
                    src: ['**/*.js'],
                    dest: 'dist/component/',
                    ext: '.js'
                }]
            },
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
        uglify: {
            main: {
                expand: true,
                cwd: 'dist',
                src: ['**/*.js', '!**/*-debug.js'],
                dest: 'dist'
            },
            seajsconfig: {
                files: {
                    'dist/seajs-config.js': [
                        'src/seajs-config.js'
                    ]
                }
            }
        },
        cssmin: {
            main: {
                files: {
                    'dist/css/app/app.css': [
                        'src/css/reset.css',
                        'src/css/module/*.css'
                    ]
                }
            }
        },
        imagemin: {
            dynamic: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'src/images/', // Src matches are relative to this path
                    src: ['**/*.{jpg,png,gif}'], // Actual patterns to match
                    dest: 'dist/images/', // Destination path prefix
                    filter: "isFile"
                }]
            }
        },
        copy:{
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
    grunt.registerTask('build', ['clean:beforeBuild', 'transport', 'concat', 'uglify', 'cssmin', 'imagemin','copy','clean:build','clean:noDebugJS']);
};
