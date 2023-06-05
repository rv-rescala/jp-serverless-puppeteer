import type { Construct } from 'constructs'
import {
    Duration,
    RemovalPolicy,
    Stack,
    aws_iam as iam,
    aws_lambda as lambda,
    aws_lambda_nodejs as lambdaNodejs,
} from 'aws-cdk-lib'
import * as cdk from "aws-cdk-lib";


export interface LambdaProps {
    name: string,
    handlerPath: string
    memorySize: number
    useWarmUp: number
    policies?: iam.PolicyStatementProps[]
    bundling?: lambdaNodejs.BundlingOptions
    environment?: {}
    layers?: lambda.ILayerVersion[]
}

export interface LambdaStackProps extends cdk.StackProps {
    resourcesPrefix: string
    functions: LambdaProps[] 
}

export class LambdaStack extends Stack {
    private props: LambdaStackProps
    public lambdaFunctions: lambdaNodejs.NodejsFunction[]

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props)
        this.props = props
        this.createLambda();
    }

    createLambda() {
        this.lambdaFunctions = this.props.functions.map((lambdaProps: LambdaProps) => {
            return new lambdaNodejs.NodejsFunction(this, `${this.props.resourcesPrefix}${lambdaProps.name}`, {
                functionName: `${this.props.resourcesPrefix}-${lambdaProps.name}`,
                environment: {
                    ...lambdaProps.environment
                },
                runtime: lambda.Runtime.NODEJS_18_X,
                timeout: Duration.seconds(60),
                handler: 'main',
                entry: lambdaProps.handlerPath,
                memorySize: lambdaProps.memorySize,
                tracing: lambda.Tracing.ACTIVE,
                currentVersionOptions: {
                    removalPolicy: RemovalPolicy.RETAIN,
                    retryAttempts: 2,
                },
                ...(lambdaProps.bundling && {
                    bundling: lambdaProps.bundling,
                }),
                layers: lambdaProps.layers,
            });
        });
    }
}
