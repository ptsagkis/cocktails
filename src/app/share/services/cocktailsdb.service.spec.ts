import { TestBed } from '@angular/core/testing';

import { CocktailsdbService } from './cocktailsdb.service';
import { HttpClientModule } from '@angular/common/http';

describe('CocktailsdbService', () => {
  let service: CocktailsdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CocktailsdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
