# AWS CDK Oracle Instant Client Basic Lite Lambda Layer and usage 

----

### This repo forms part of a blog post made here => https://www.rehanvdm.com/serverless/an-unexpected-journey-with-lambda-oracledb/index.html

----

This repo holds a Lambda layer that hosts the Oracle Instant Client Basic Lite v19 libraries and includes the libaio.so
file as well. These operating system specific libraries are required for the official oracledb nodejs package.

For local development, each developer needs to manually install these operating system specific libraries
on their machines. Watch out for the initial connection to the database which seems to be tied to the amount of memory
you specify for the function up until about 1024MB. 

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run deploy`  change the profile in the package.json file to deploy to your account
 * `npm run diff`    change the profile in the package.json file to compare deployed stack with current state
 * `node ./node_modules/mocha/bin/mocha --ui bdd ./tests/lambda/oracle-test/test-connection.js --grep "^Test Success Test Connect$"` 
    to run the local test
