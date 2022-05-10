import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, of } from 'rxjs';
import { Question, QuestionsResponce } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private _questions: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);

  public get $questions(): Observable<Question[]>{
    return this._questions.asObservable();
  }

  public get questions(): Question[]{
    return this._questions.value;
  }

  constructor(private readonly httpClient: HttpClient) {
    this.reload();
  }

  /**
   * Load qyestions from server
   */
  public reload(): void {
    this.httpClient.get<QuestionsResponce>('/assets/json/questions.json')
      .subscribe((resp: QuestionsResponce) => {
        this._questions.next(resp.patientQuestions);
      });
  }

  /**
   * Save user answer on server
   * @param questions question with answers
   */
  public saveAnswers(questions: Question[]): Observable<any> {
    // send request to server and update state

    return of();
  }
}
