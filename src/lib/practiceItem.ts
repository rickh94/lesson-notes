export class PracticeItem {
  title: string;
  resources: string[];
  notes: string;
  id: number;

  constructor() {
    this.title = '';
    this.resources = [];
    this.notes = '';
    this.id = Math.random();
  }
}
