#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LambdaOracleInstantClientBlogStack } from '../lib/lambda-oracle-instant-client-blog-stack';

const app = new cdk.App();
new LambdaOracleInstantClientBlogStack(app, 'LambdaOracleInstantClientBlogStack');
