module.exports = function(grunt) {
  grunt.initConfig({
    // Build the game & editor source files
    concat: {
      build: {
        src: [
          'src/game/*/*.js',
          'src/game/main.js'
        ],
        dest: 'public/lib/lib.js',
      },
      editor: {
        src: ['src/editor/**/*.js'],
        dest: 'editor/lib/lib.js',
      },
    },
    // Minify the game & editor builds.
    terser: {
      src: {
        files: [{
            src: 'public/lib/lib.js',
            dest: 'public/lib/lib.min.js',
          },
          {
            src: 'editor/lib/lib.js',
            dest: 'editor/lib/lib.min.js',
          }
        ]
      },
    },
    vdoc: {
      compile: {
        options: {
          meta: {
            name: "myProject",
            version: "0.0.0",
            github: "https://github.com/MomoClubProg/iogame"
          },
          dest: "./doc/build/",
          source: "./public/lib/lib.js",
          content: "./doc/content/data.json",
          templates: "./doc/theme/",
          partials: "./doc/theme/partials/",
          assets: "./doc/theme/assets/"
        }
      }
    },
  });

  // Npm tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-vdoc');
  grunt.loadNpmTasks('grunt-terser');

  // Custom tasks
  grunt.registerTask('build', ['concat', 'terser'])
}