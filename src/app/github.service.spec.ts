import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('ListUsersProxyServiceIT', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [GithubService]
    });
  });
 
  it('should be created', inject([GithubService], (service: GithubService) => {
    expect(service).toBeTruthy();
  }));
 
  it ('should get issues', async(() => {
    const service: GithubService = TestBed.get(GithubService);
    let url = 'https://api.github.com/repos/angular/components/issues?page=1&per_page=100'
    let response = service.buscarIssues(url);
      expect(response).not.toBeNull()
  }));
});
