module.exports = function(){
  return function archivePage(files, metalsmith, done){
    var archive = metalsmith.metadata().archive;
    if (archive) {
      files['index.html'] = {
        contents: new Buffer(
          archive.map(x => {
            return `<h1>${x.year}</h1>
              <ul>
              ${ x.data.map(post => `<li><a href='${post.fileName}'>${post.title}</a></li>`).join('') }
              </ul>
            `
          }).join('')
        ),
        layout: 'layout.html'
      }
    }
    done();
  }
}
