export const foo = '';
export function bar() {}

export class Customer {
    private id: number;

    constructor(id: number) {
        this.id = id;
    }

    fooBar(): string {
        setTimeout(() => {
            console.log('ID', this.id);
        }, 2000);
        
        return '';
    }
}