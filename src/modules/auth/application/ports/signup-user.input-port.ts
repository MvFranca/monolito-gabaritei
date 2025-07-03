export interface SignupUserInputPort<Input, Output> {
    execute(input: Input): Promise<Output>;
}