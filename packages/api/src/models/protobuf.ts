export type IProtobuf =
  | IProtobufString
  | IProtobufStruct<any>
  | IProtobufList<any>
  | IProtobufOMDefaultEvaluationCriteria;

export interface IProtobufString {
  "@type": "google.protobuf.StringValue";
  value: string;
}

export interface IProtobufStruct<T extends object> {
  "@type": "google.protobuf.Struct";
  value: T;
}

export interface IProtobufList<T> {
  "@type": "google.protobuf.ListValue";
  values: T[];
}

export interface IProtobufOMDefaultEvaluationCriteria {
  "@type": "openmatch.DefaultEvaluationCriteria";
  Score: number;
}
