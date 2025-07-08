enum ButtonType {
  DragAndDropQuestion = 'DragAndDropQuestion',
  MultipleChoiceQuestion = 'MultipleChoiceQuestion',
  UserQuestionAnswer = 'UserQuestionAnswer',
  Award = 'Award',
  Performance = 'Performance',
}

interface Button {
  type: ButtonType;
  quantity: number;
  position?: string;
}

export class ContentTrail {
  constructor(
      public readonly name: string,
      public readonly description: string,

      public readonly position: number,
      public readonly wheight: number,

      public readonly  buttons: Button[],

      public readonly id?: string,

  ) {}
}
