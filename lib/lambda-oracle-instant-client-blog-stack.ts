import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

export class LambdaOracleInstantClientBlogStack extends cdk.Stack
{
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps)
  {
    super(scope, id, props);

    const oracleLayer = new lambda.LayerVersion(this, 'lambda-oracle-instant-client-layer', {
      layerVersionName: 'lambda-oracle-instant-client-layer',
      code: new lambda.AssetCode('src/lambda-layer/oracle-instant-client/'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_12_X],
      description: 'A layer that contains the Oracle Instant Client v19 + libaio.so which is a dependency for node-oracledb',
    });

    new cdk.CfnOutput(this, 'ORACLE_LAYER_ARN', { value:  oracleLayer.layerVersionArn });

    /* Import from ARN for other projects */
    // const oracleLayer = lambda.LayerVersion.fromLayerVersionArn(this, 'lambda-oracle-instant-client-layer', <oracle client layer arn>);

    new lambda.Function(this, "oracle-test", {
      functionName: "oracle-test",
      code: new lambda.AssetCode('src/lambda/oracle-test/'),
      handler: 'app.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(60),
      environment: {
        DB_USER: "",
        DB_PASSWORD: "",
        DB_CONNECTION_STRING: "",
      },
      layers: [oracleLayer],
      tracing: lambda.Tracing.ACTIVE
    });

  }
}
