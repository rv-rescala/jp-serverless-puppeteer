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
    bundling?: lambdaNodejs.BundlingOptions
    environment?: {}
    layers?: lambda.ILayerVersion[]
    policySatements?: iam.PolicyStatement[]
}

export interface LambdaStackProps extends cdk.StackProps {
    resourcesPrefix: string,
    functions: LambdaProps[],
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
            const lambdaExecutionRole = new iam.Role(this, `${this.props.resourcesPrefix}${lambdaProps.name}LambdaFnExecRole`, {
                roleName: `${this.props.resourcesPrefix}_${lambdaProps.name}-exec-role`,
                assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
                managedPolicies: [
                    iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                ],
            });
            lambdaProps?.policySatements?.forEach((policySatement: iam.PolicyStatement) => {
                lambdaExecutionRole.addToPolicy(policySatement);
            })

            return new lambdaNodejs.NodejsFunction(this, `${this.props.resourcesPrefix}${lambdaProps.name}`, {
                functionName: `${this.props.resourcesPrefix}-${lambdaProps.name}`,
                runtime: lambda.Runtime.NODEJS_18_X,
                role: lambdaExecutionRole,
                timeout: Duration.seconds(60),
                handler: 'main',
                entry: lambdaProps.handlerPath,
                memorySize: lambdaProps.memorySize,
                layers: lambdaProps.layers,
                bundling: lambdaProps.bundling,
                environment: {
                    ...lambdaProps.environment
                },
            });
        });
    }
}
