const fs = require('fs');

const folders = {
  commonbe: ['/dist/common-backend', '/node_modules/common-backend'],
};

Object.keys(folders).forEach((k) => {
  const [source, target] = folders[k];

  fs.symlink(process.cwd() + source, process.cwd() + target, 'dir', (err) => {
    if (err) {
      if (err.code === 'EEXIST') {
        console.log('Symlink already exists for ' + source + ' -> ' + target);
      } else {
        console.log(err);
      }
    } else {
      console.log('Symlink created for ' + source + ' -> ' + target);
    }
  });
});
