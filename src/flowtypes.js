// @flow

type FieldName = string;
type TargetFieldName = FieldName;
type SourceFieldName = FieldName;
type Source = { [name: SourceFieldName]: any };
type Target = { [name: TargetFieldName]: any };

type NamedRule = string;
type FunctionRule = (context: Object, name?: TargetFieldName) => any;
type Rule = (NamedRule|FunctionRule);

type Rules = {
  [name: TargetFieldName]: Rule
};

export type Converter = (rules: Rules, source: Source) => Target;
type ConverterPartial = (source: Source) => Target;
export type ConverterFactory = (rules: Rules) => ConverterPartial;
