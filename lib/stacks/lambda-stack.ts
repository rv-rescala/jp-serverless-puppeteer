import type { Construct } from 'constructs'
import {
    Duration,
    RemovalPolicy,
    Stack,
    aws_iam as iam,
    aws_lambda as lambda,
    aws_lambda_nodejs as lambdaNodejs,
} from 'aws-cdk-lib'
import { aws_ec2 } from "aws-cdk-lib"
import { join } from 'path'
import * as cdk from "aws-cdk-lib";
import * as fs from 'fs';
import * as path from 'path';

export interface LambdaStackProps extends cdk.StackProps {
    resourcesPrefix: string
    function: {
        handlerPath: string
        memorySize: number
        useWarmUp: number
        policies?: iam.PolicyStatementProps[]
        bundling?: lambdaNodejs.BundlingOptions
        environment?: {}
    }
}

export class LambdaStack extends Stack {
    private props: LambdaStackProps

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props)
        this.props = props
        this.createLambda();
    }

    createLambda() {
        // create lambda function datasource
        new lambdaNodejs.NodejsFunction(this, `${this.props.resourcesPrefix}PrismaFn`, {
            functionName: `${this.props.resourcesPrefix}_prisma_fn`,
            environment: {
                ...this.props.function.environment
            },
            runtime: lambda.Runtime.NODEJS_18_X,
            timeout: Duration.seconds(60),
            handler: 'main',
            entry: join(this.props.function.handlerPath, 'test-capture.ts'),
            memorySize: this.props.function.memorySize,
            tracing: lambda.Tracing.ACTIVE,
            currentVersionOptions: {
                removalPolicy: RemovalPolicy.RETAIN,
                retryAttempts: 2,
            },
            ...(this.props.function.bundling && {
                bundling: this.props.function.bundling,
            }),
        });
    }
}
