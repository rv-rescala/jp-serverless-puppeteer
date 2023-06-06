import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface S3StackProps extends cdk.StackProps {
  resourcesPrefix: string,
  bucketName: string
}

export class S3Stack extends Stack {
  public readonly policySatement: iam.PolicyStatement;
  constructor(scope: Construct, id: string, props?: S3StackProps) {
    super(scope, id, props);

    const s3bucket = new aws_s3.Bucket(this, 'S3Stack', {
      bucketName: props?.bucketName,
      versioned: false,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // S3 Access Policy
    this.policySatement = new iam.PolicyStatement({
      actions: [ // Allow the Lambda function to perform the following S3 actions
        's3:GetObject',
        's3:PutObject',
      ],
      resources: [ // Restrict access to a specific S3 bucket
        `arn:aws:s3:::${props?.bucketName}/*`,
      ],
      effect: iam.Effect.ALLOW, // Set the effect to "Allow"
    });
  }
}
