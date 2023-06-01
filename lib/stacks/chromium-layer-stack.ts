import * as cdk from 'aws-cdk-lib';
import { LayerVersion, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { Construct } from "constructs";

interface ChromiumLayerStackProps extends cdk.StackProps {
  chromeVersionNumber: string;
  nodeVersion: string;
}

export class ChromiumLayerStack extends cdk.Stack {
  public readonly layer: LayerVersion;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const versionNumber = "107";
    const nodeVersion = "18"

    // Create a new Lambda layer
    this.layer = new LayerVersion(this, 'ChromiumLayer', {
      code: Code.fromAsset('./chromium/chromium.zip'), // path to your local chromium.zip file
      compatibleRuntimes: [Runtime.NODEJS_18_X], // Update to your Lambda runtime
      layerVersionName: `chromium${versionNumber}`,
      description: `Chromium v${versionNumber}`,
    });
  }
}
