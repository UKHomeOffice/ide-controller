rm -rf dist

docker run --rm \
 --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
 --env ELECTRON_CACHE="/root/.cache/electron" \
 -v $(dirname "$PWD")/react/build:/project/react/build \
 -v ${PWD}:/project \
 -v ${PWD}/node_modules:/project/node_modules \
 -v ~/.cache/electron:/root/.cache/electron \
 electronuserland/builder:wine /bin/bash -c "npm run dist"
