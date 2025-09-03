export class User {
  constructor(public id: string, public name: string, public email: string) {}

  updateEmail(newEmail: string): void {
    if (!newEmail.includes('@')) throw new Error('Invalid email');
    this.email = newEmail;
  }

  getDisplayName(): string {
    return `${this.name} (${this.email})`;
  }
}