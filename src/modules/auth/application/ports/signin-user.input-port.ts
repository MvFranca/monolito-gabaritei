export interface SigninUserInputPort<Input, Output> {
    execute(input: Input): Promise<Output>;
}