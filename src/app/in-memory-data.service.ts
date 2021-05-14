import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Ciao } from './ciao';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const ciaos = [
      { id: 11, name: 'Mike' },
      { id: 12, name: 'Sandra' },
      { id: 13, name: 'Jorge' },
      { id: 14, name: 'Henry' },
      { id: 15, name: 'Wanda' },
      { id: 16, name: 'Philipe' },
      { id: 17, name: 'Roger' },
      { id: 18, name: 'Missy' },
      { id: 19, name: 'Bob' },
      { id: 20, name: 'Nicole' }
    ];
    return {ciaos};
  }

  
  genId(ciaos: Ciao[]): number {
    return ciaos.length > 0 ? Math.max(...ciaos.map(hero => hero.id)) + 1 : 11;
  }
}

