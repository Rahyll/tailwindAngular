import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdmissionService {
  private apiUrl = `${environment.apiBaseUrl}/applications`;

  constructor(private http: HttpClient) {}

  /**
   * Submit new admission application
   * @param applicationData Complete application data
   */
  submitApplication(applicationData: any): Observable<any> {
    return this.http
      .post(this.apiUrl, applicationData)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get all submitted applications
   */
  getApplications(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(catchError(this.handleError));
  }

  /**
   * Get single application by ID
   * @param id Application ID
   */
  getApplication(id: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update application status
   * @param id Application ID
   * @param status New status value
   */
  updateApplicationStatus(id: string, status: string): Observable<any> {
    return this.http
      .patch(`${this.apiUrl}/${id}`, { status })
      .pipe(catchError(this.handleError));
  }

  /**
   * Upload document file
   * @param fileData FormData containing the file
   */
  uploadDocument(fileData: FormData): Observable<any> {
    return this.http
      .post(`${environment.apiBaseUrl}/upload`, fileData)
      .pipe(catchError(this.handleError));
  }

  /**
   * Handle HTTP errors
   * @param error Error response
   */
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
