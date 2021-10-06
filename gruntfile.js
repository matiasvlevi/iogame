module.exports = function(grunt) {
  grunt.initConfig({
    // Build the game & editor source files
    concat: {
      build: {
        src: ['src/game/**/*.js'],
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
    }
  });

  // Npm tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-terser');

  // Custom tasks
  grunt.registerTask('build', ['concat', 'terser'])
}