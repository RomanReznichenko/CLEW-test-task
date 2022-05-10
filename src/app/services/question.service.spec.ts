import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { QuestionService } from './question.service';
import { QuestionsResponce } from '../models/question.model';
import { filter } from 'rxjs';

describe('QuestionService', () => {
  let service: QuestionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionService],
    });
    service = TestBed.inject(QuestionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    httpMock.expectOne(`/assets/json/questions.json`);
  });

  it('should load questions', () => {
    const questionsMock: QuestionsResponce = {
      patientQuestions: [
        {
          title: 'Question title',
          type: 'radio'
        },
        {
          title: 'Question title',
          type: 'select'
        }
      ]
    };

    const req = httpMock.expectOne(`/assets/json/questions.json`);
    req.flush(questionsMock);

    service.$questions.pipe(filter(e => e?.length > 0)).subscribe(questions => {
      expect(questions).toEqual(questionsMock.patientQuestions);
    });

  });

  describe('reload', () => {
    beforeEach(() => {
      const questionsMock: QuestionsResponce = {
        patientQuestions: [
          {
            title: 'Question title',
            type: 'radio'
          },
          {
            title: 'Question title',
            type: 'select'
          }
        ]
      };

      const req = httpMock.expectOne(`/assets/json/questions.json`);
      req.flush(questionsMock);
    })

    it('should reload questions', () => {
      const questionsMock: QuestionsResponce = {
        patientQuestions: [
          {
            title: 'New question title',
            type: 'number'
          }
        ]
      };

      service.reload();
      const req = httpMock.expectOne(`/assets/json/questions.json`);
      req.flush(questionsMock);


      service.$questions.pipe(filter(e => e?.length > 0)).subscribe(questions => {
        expect(questions).toEqual(questionsMock.patientQuestions);
      });
    });
  });
});
