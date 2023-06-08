import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LayerVersion, Runtime, Code, } from 'aws-cdk-lib/aws-lambda';
import {
  aws_iam as iam,
  aws_lambda as lambda,
  aws_lambda_nodejs as lambdaNodejs,
  aws_s3 as s3,
  Duration
} from 'aws-cdk-lib'

export interface LambdaProps {
  name: string,
  handlerPath: string
  memorySize: number
  useWarmUp: number
  bundling?: lambdaNodejs.BundlingOptions
  environment?: {}
}

export interface ServerlessPuppeteerStackProps extends cdk.StackProps {
  resourcesPrefix: string,
  bucketName: string
  functions: LambdaProps[]
}

export class ServerlessPuppeteerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ServerlessPuppeteerStackProps) {
    super(scope, id, props);

    const s3bucket = new s3.Bucket(this, 'S3Stack', {
      bucketName: props?.bucketName,
      versioned: false,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const fontLayer = new LayerVersion(this, 'FontLayerStack', {
      code: Code.fromAsset('./fonts/fonts.zip'), // path to your local chromium.zip file
      compatibleRuntimes: [Runtime.NODEJS_18_X]
    });

    const versionNumber = "107";
    const chronumLayer = new LayerVersion(this, 'ChromiumLayer', {
      code: Code.fromAsset('./chromium/chromium.zip'), // path to your local chromium.zip file
      compatibleRuntimes: [Runtime.NODEJS_18_X], // Update to your Lambda runtime
      layerVersionName: `chromium${versionNumber}`,
      description: `Chromium v${versionNumber}`,
    });

    // S3 Access Policy
    const s3PolicySatement = new iam.PolicyStatement({
      actions: [ // Allow the Lambda function to perform the following S3 actions
        's3:GetObject',
        's3:PutObject',
      ],
      resources: [ // Restrict access to a specific S3 bucket
        `arn:aws:s3:::${props?.bucketName}/*`,
      ],
      effect: iam.Effect.ALLOW, // Set the effect to "Allow"
    });

    props.functions.map((lambdaProps: LambdaProps) => {
      const lambdaExecutionRole = new iam.Role(this, `${props.resourcesPrefix}${lambdaProps.name}LambdaFnExecRole`, {
        roleName: `${props.resourcesPrefix}_${lambdaProps.name}-exec-role`,
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        ],
      });
      lambdaExecutionRole.addToPolicy(s3PolicySatement);

      new lambdaNodejs.NodejsFunction(this, `${props.resourcesPrefix}${lambdaProps.name}`, {
        functionName: `${props.resourcesPrefix}-${lambdaProps.name}`,
        runtime: lambda.Runtime.NODEJS_18_X,
        timeout: Duration.seconds(60),
        handler: 'main',
        role: lambdaExecutionRole,
        entry: lambdaProps.handlerPath,
        memorySize: lambdaProps.memorySize,
        layers: [fontLayer, chronumLayer],
        bundling: lambdaProps.bundling,
        environment: {
          ...lambdaProps.environment
        },
      });
    });
  }
}
