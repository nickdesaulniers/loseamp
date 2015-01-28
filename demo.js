if (process.argv.length !== 3) {
  console.error('Usage: node demo.js song.mp3');
  process.exit(1);
}

function lPad2 (str) { return str.length < 2 ? '0' + str : str; };

var song = require('fs').createReadStream(process.argv[2]);

require('musicmetadata')(song, { duration: true }).on('metadata', function (result) {
  console.log('Playing "%s" - %s : %d:%s', result.title, result.artist[0],
    result.duration / 60 | 0, lPad2((result.duration % 60 | 0).toString()));
});

song.pipe(new (require('lame').Decoder)).pipe(new (require('speaker')))
    .on('finish', function () { console.log('done'); });

