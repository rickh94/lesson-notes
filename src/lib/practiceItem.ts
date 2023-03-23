export class PracticeItem {
  title: string;
  resources: string[];
  notes: string;
  label: string;
  id: number;

  constructor() {
    this.title = '';
    this.label = '';
    this.resources = [];
    this.notes = '';
    this.id = Math.random();
  }
}
