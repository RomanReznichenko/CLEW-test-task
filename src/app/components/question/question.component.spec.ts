import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';

import { QuestionComponent } from './question.component';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let mockQuestionService: QuestionService;

  const mockedQuestions = [
    {
      "title": "Age",
      "type": "number"
    },
    {
      "title": "Are you using any heart medications ?",
      "type": "radio",
      "childItems": [
        {
          "parentAnswer": "1",
          "title": "Select medication",
          "type": "select",
          "options": [
            "Accupril",
            "Aceon (perindopril)",
            "Adalat (nifedipine)",
            "Altace (ramipril)",
            "Apresoline (hydralazine)",
            "Aspirin",
            "Benicar HCT (hydrochlorothiazide and olmesartan)",
            "Brilinta (ticagrelor)"
          ],
          "childItems": [
            {
              "parentAnswer": "Aspirin",
              "title": "How many times did you tooks Aspirin today?",
              "type": "number"
            },
            {
              "parentAnswer": "Aspirin",
              "title": "Did you had any water today?",
              "type": "radio",
              "childItems": [
                {
                  "parentAnswer": "1",
                  "title": "Did you drunk more then 1 liter of water today?",
                  "type": "radio"
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionComponent],
      providers: [QuestionService],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatRadioModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    mockQuestionService = TestBed.inject(QuestionService);
    spyOnProperty(mockQuestionService, '$questions', 'get').and.returnValue(of(mockedQuestions));
    spyOnProperty(mockQuestionService, 'questions', 'get').and.returnValue(mockedQuestions);
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate form group', () => {
    expect(component.questionForm).toBeDefined();
  });

  it('should save changes', () => {
    const spy = spyOn(mockQuestionService, 'saveAnswers').and.returnValue(of());
    component.questionForm.get('Age')?.setValue('20');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
