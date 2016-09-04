rm -rf dist
mkdir dist

(echo "(function(){"; cat src/fp.js | ./node_modules/.bin/babel --presets babel-preset-es2015; echo "}();") > dist/fp.js
echo "(function(){`cat src/fp.js | ./node_modules/.bin/babel --presets babel-preset-es2015 | ./node_modules/.bin/uglifyjs`}();" > dist/fp.min.js