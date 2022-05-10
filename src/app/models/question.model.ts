export interface Question {
  type: string;
  title: string;
  options?: string[];
  answer?: string;
  parentAnswer?: string;
  childItems?: Question[];
}

export interface QuestionsResponce {
  patientQuestions: Question[];
}
