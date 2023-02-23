export class Contact {
    firstName;
    lastName;
    categories = [];
    
    set firstName(firstName) {
        this.firstName = firstName;
    }

    set lastName(lastName) {
        this.lastName = lastName;
    }

    addCategories(...categories) {
        categories.forEach(c => this.categories.push(c))
    }

    get firstName() {
        return this.firstName;
    }

    get lastName() {
        return this.lastName;
    }

    get categories() {
        return this.categories;
    }
}