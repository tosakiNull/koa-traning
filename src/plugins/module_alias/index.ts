import path from 'path';
import moduleAlias from 'module-alias';

// 絕對路徑, 此index檔案路徑, 替換路徑
moduleAlias.addAliases({
    '@': path.resolve(__dirname, '../../..', 'src'),
    '@bin': path.resolve(__dirname, '../../..', 'src/bin'),
    '@controller': path.resolve(__dirname, '../../..', 'src/controller'),
    '@router': path.resolve(__dirname, '../../..', 'src/router'),
    '@plugins': path.resolve(__dirname, '../../..', 'src/plugins'),
});

moduleAlias();
