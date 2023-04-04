import type { PracticeItem } from "./practiceItem";

export class NotesData {
  warmups: PracticeItem[];
  exercises: PracticeItem[];
  pieces: PracticeItem[];
  generalNotes: string;
  date: Date;

  constructor(
    warmups: PracticeItem[] = [],
    exercises: PracticeItem[] = [],
    pieces: PracticeItem[] = [],
    generalNotes = '',
    date?: Date,
  ) {
    this.warmups = warmups;
    this.exercises = exercises;
    this.pieces = pieces;
    this.generalNotes = generalNotes;
    if (date) {
      this.date = date;
    } else {
      this.date = new Date();
    }
  }

}
