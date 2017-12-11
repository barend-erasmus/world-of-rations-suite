import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

  private counter: number = 0;

  public isLoading: boolean = false;

  constructor() {

  }

  public reset(): void {
    this.counter = 0;
    this.isLoading = false;
  }

  public startRequest(): void {
    this.counter = this.counter + 1;
    this.setIsLoading();
  }

  public endRequest(): void {
    this.counter = this.counter - 1;
    this.setIsLoading();
  }

  private setIsLoading(): void {
    if (this.counter > 0) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
  }

}
