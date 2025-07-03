
export interface Mapper<In, Out> {
  toDTO(input: In): Out;
}