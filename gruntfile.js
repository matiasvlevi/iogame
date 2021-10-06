module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      build: {
        src: ['src/game/**/*.js'],
        dest: 'public/lib.js',
      },
      editor: {
        src: ['src/editor/**/*.js'],
        dest: 'editor/lib.js',
      },
    },
    terser: {
      src: {
        files: [{
            src: 'public/lib.js',
            dest: 'public/lib.min.js',
          },
          {
            src: 'editor/lib.js',
            dest: 'editor/lib.min.js',
          }
        ]
      },
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-terser');

  grunt.registerTask('build', ['concat', 'terser'])
}