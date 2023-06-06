import * as cdk from 'aws-cdk-lib';
import { LayerVersion, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { Construct } from "constructs";

export class FontLayerStack extends cdk.Stack {
  public readonly layer: LayerVersion;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new Lambda layer
    this.layer = new LayerVersion(this, 'FontLayerStack', {
      code: Code.fromAsset('./fonts/fonts.zip'), // path to your local chromium.zip file
      compatibleRuntimes: [Runtime.NODEJS_18_X]
    });
  }
}
