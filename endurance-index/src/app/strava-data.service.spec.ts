import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { StravaDataService } from './strava-data.service';
import { Token } from './model/token';

describe('StravaDataService', () => {
  let service: StravaDataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const testUrl = 'spoon/ast';

  beforeEach(() => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });

      // Inject the http service and test controller for each test
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    // Tests begin ///
    it('should refresh token', () => {
      service.refreshToken();
      let testData = {};
      // The following `expectOne()` will match the request's URL.
      // If no requests or multiple requests matched that URL
      // `expectOne()` would throw.
      const req = httpTestingController.expectOne(testUrl);

      // Assert that the request is a POST.
      expect(req.request.method).toEqual('POST');

      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      req.flush(testData);
      expect(req.request.body).toEqual({});
      expect(dataSource.data.length).toBe(1);
      expect(dataSource.data[0]).toBe(testData);

      // Finally, assert that there are no outstanding requests.
      httpTestingController.verify();
    });
  });
});
