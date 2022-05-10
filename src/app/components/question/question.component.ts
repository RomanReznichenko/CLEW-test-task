import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public questions!: Observable<Question[]>;
  public questionForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly questionService: QuestionService) { }

  ngOnInit(): void {
    this.questions = this.questionService.$questions;

    this.questions.subscribe(questions => {
      this.questionForm = this.buildForm(questions);
      this.questionForm.valueChanges.subscribe(_ => this.saveAnsver(questions));
    });

  }

  private buildForm(questions: Question[]) {
    const controls = questions.reduce((accum, value) => {
      return { ...accum, ...this.toControl(value) };
    }, {});

    return this.formBuilder.group(controls);
  }

  private toControl(question: Question) {
    const control: any = {};

    control[question.title] = new FormControl(question.answer);
    if (question.childItems?.length) {
      control[`sub-${question.title}`] = this.buildForm(question.childItems);
    }

    return control;
  }

  private saveAnsver(questions: Question[]): void {
    questions.forEach(question => this.setAnseverToQuestion(question, this.questionForm));

    console.log(questions);

    this.questionService.saveAnswers(questions);
  }

  private setAnseverToQuestion(question: Question, form: AbstractControl): void {
    question.answer = form.get(`${question.title}`)?.value;
    if (question.childItems?.length) {
      const control = form.get(`sub-${question.title}`);
      if (!control) {
        return;
      }

      question.childItems.forEach(q => this.setAnseverToQuestion(q, control));
    }
  }

}
